import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { SendOtpRequest, VerifyOtpRequest } from '@vion/proto';

import { OtpService } from '../otp/otp.service';
import { Account } from '../prisma/generated/client';

import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly otpService: OtpService
	) {}

	async sendOtp(data: SendOtpRequest) {
		const { identifier, type } = data;

		let account: Account | null;

		if (type === 'phone')
			account = await this.authRepository.findByPhone(identifier);
		else account = await this.authRepository.findByEmail(identifier);

		if (!account)
			account = await this.authRepository.createAccount({
				email: type === 'email' ? identifier : undefined,
				phone: type === 'phone' ? identifier : undefined,
			});

		const code = await this.otpService.send(
			identifier,
			type as 'phone' | 'email'
		);

		console.debug(`CODE: ${code}`);

		return { ok: true };
	}

	async verifyOtp(data: VerifyOtpRequest) {
		const { identifier, type, code } = data;

		await this.otpService.verify(identifier, code, type as 'phone' | 'email');

		let account: Account | null;

		if (type === 'phone')
			account = await this.authRepository.findByPhone(identifier);
		else account = await this.authRepository.findByEmail(identifier);

		if (!account) throw new RpcException('Account not found');

		if (type === 'phone' && !account.isPhoneVerified)
			await this.authRepository.updateAccount(account.id, {
				isPhoneVerified: true,
			});

		if (type === 'email' && !account.isEmailVerified)
			await this.authRepository.updateAccount(account.id, {
				isEmailVerified: true,
			});

		return {
			accessToken: 'rjlksadjdrklasdklrja',
			refreshToken: 'alkdajlkflskdflaksdjf',
		};
	}
}
