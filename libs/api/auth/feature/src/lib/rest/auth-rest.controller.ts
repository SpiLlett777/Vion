import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';

import { SendOtpRequest, VerifyOtpRequest } from '@vion/api/contracts';
import { AuthClientGrpc } from '@vion/auth/data-access';
import { HttpStatusCode } from 'axios';
import type { Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthRestController {
	constructor(
		private readonly client: AuthClientGrpc,
		private readonly configService: ConfigService
	) {}

	@ApiOperation({
		summary: 'Send OTP code',
		description: 'Sends a verification code to the user phone number or email',
	})
	@Post('otp/send')
	@HttpCode(HttpStatusCode.Ok)
	async sendOtp(@Body() dto: SendOtpRequest) {
		console.log('DATA: ', dto);

		return this.client.sendOtp(dto);
	}

	@ApiOperation({
		summary: 'Verify OTP code',
		description:
			'Verifies the code sent to the user phone number or email and returns an access token',
	})
	@Post('otp/verify')
	@HttpCode(HttpStatusCode.Ok)
	async verifyOtp(
		@Body() dto: VerifyOtpRequest,
		@Res({ passthrough: true }) res: Response
	) {
		console.log('DATA: ', dto);

		const { accessToken, refreshToken } = await lastValueFrom(
			this.client.verifyOtp(dto)
		);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: this.configService.getOrThrow('NODE_ENV') !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});

		return { accessToken: accessToken };
	}

	@ApiOperation({
		summary: 'Refresh access token',
		description: 'Renews access token using refresh token from cookies',
	})
	@Post('refresh')
	@HttpCode(HttpStatusCode.Ok)
	async refresh(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response
	) {
		const refreshToken = request.cookies?.refreshToken;

		const { accessToken, refreshToken: newRefreshToken } = await lastValueFrom(
			this.client.refresh({
				refreshToken: refreshToken,
			})
		);

		response.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: this.configService.getOrThrow('NODE_ENV') !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});

		return { accessToken: accessToken };
	}

	@ApiOperation({
		summary: 'Logout',
		description: 'Clears the refresh token cookie and logs the user out',
	})
	@Post('logout')
	@HttpCode(HttpStatusCode.Ok)
	async logout(@Res({ passthrough: true }) response: Response) {
		response.cookie('refreshToken', '', {
			httpOnly: true,
			secure: this.configService.getOrThrow('NODE_ENV') !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			expires: new Date(0),
		});

		return { ok: true };
	}
}
