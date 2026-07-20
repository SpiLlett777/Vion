import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { SendOtpRequest, VerifyOtpRequest } from '@vion/api/contracts';
import { AuthClientGrpc } from '@vion/auth/data-access';
import { HttpStatusCode } from 'axios';

@Controller('auth')
export class AuthRestController {
	constructor(private readonly client: AuthClientGrpc) {}

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
	async verifyOtp(@Body() dto: VerifyOtpRequest) {
		console.log('DATA: ', dto);

		return this.client.verifyOtp(dto);
	}
}
