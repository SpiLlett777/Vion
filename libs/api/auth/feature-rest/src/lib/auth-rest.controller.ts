import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { SendOtpRequest } from '@vion/auth/util-contracts';
import { HttpStatusCode } from 'axios';

@Controller('auth')
export class AuthController {
	@ApiOperation({
		summary: 'Send OTP code',
		description: 'Sends a verification code to the user phone number or email',
	})
	@Post('otp/send')
	@HttpCode(HttpStatusCode.Ok)
	async sendOtp(@Body() dto: SendOtpRequest) {
		console.log('DATA: ', dto);

		return { ok: true };
	}
}
