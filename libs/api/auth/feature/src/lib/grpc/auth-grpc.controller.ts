import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AuthService } from '@vion/api/auth/data-access';
import type {
	RefreshRequest,
	RefreshResponse,
	SendOtpRequest,
	SendOtpResponse,
	VerifyOtpRequest,
	VerifyOtpResponse,
} from '@vion/api/shared/utils';

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
