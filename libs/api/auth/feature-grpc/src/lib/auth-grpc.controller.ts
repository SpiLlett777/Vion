import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AuthService } from '@vion/auth/data-access';
import type { SendOtpRequest, SendOtpResponse } from '@vion/proto';

@Controller()
export class AuthGrpcController {
	constructor(private readonly authService: AuthService) {}

	@GrpcMethod('AuthService', 'SendOtp')
	async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
		console.log(`Incoming OTP request: `, data);

		return { ok: true };
	}
}
