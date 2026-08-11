import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import type {
	RefreshRequest,
	RefreshResponse,
	SendOtpRequest,
	SendOtpResponse,
	VerifyOtpRequest,
	VerifyOtpResponse,
} from '@vion/api/shared/utils';
import { AuthService } from '@vion/auth/data-access';

@Controller()
export class AuthGrpcController {
	constructor(private readonly authService: AuthService) {}

	@GrpcMethod('AuthService', 'SendOtp')
	async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
		console.log(`Incoming OTP request: `, data);

		return await this.authService.sendOtp(data);
	}

	@GrpcMethod('AuthService', 'VerifyOtp')
	async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
		console.log(`Incoming OTP request: `, data);

		return await this.authService.verifyOtp(data);
	}

	@GrpcMethod('AuthService', 'Refresh')
	async refresh(data: RefreshRequest): Promise<RefreshResponse> {
		return await this.authService.refresh(data);
	}
}
