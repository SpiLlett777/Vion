import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';

import { SendOtpRequest, VerifyOtpRequest } from '@vion/api/contracts';
import { AuthClientGrpc } from '@vion/auth/data-access';
import { HttpStatusCode } from 'axios';
import type { Response } from 'express';
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
}
