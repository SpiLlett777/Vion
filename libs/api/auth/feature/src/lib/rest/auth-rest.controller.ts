import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { SendOtpRequest } from '@vion/api/contracts';
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
}
