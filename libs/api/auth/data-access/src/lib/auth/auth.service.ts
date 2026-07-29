import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';

import { PassportService, type TokenPayload } from '@vion/api/auth-passport';
import type { AllConfigs } from '@vion/api/contracts';
import {
	RpcStatus,
	SendOtpRequest,
	VerifyOtpRequest,
} from '@vion/api/shared/utils';

import { OtpService } from '../otp/otp.service';
import { Account } from '../prisma/generated/client';

import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
	private readonly ACCESS_TOKEN_TTL: number;
	private readonly REFRESH_TOKEN_TTL: number;

	constructor(
		private readonly configService: ConfigService<AllConfigs>,
		private readonly authRepository: AuthRepository,
		private readonly otpService: OtpService,
		private readonly passportService: PassportService
	) {
		this.ACCESS_TOKEN_TTL = <number>configService.get('passport.accessTtl', {
			infer: true,
		});
		this.REFRESH_TOKEN_TTL = <number>configService.get('passport.refreshTtl', {
			infer: true,
		});
	}

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

		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Account not found',
			});

		if (type === 'phone' && !account.isPhoneVerified)
			await this.authRepository.updateAccount(account.id, {
				isPhoneVerified: true,
			});

		if (type === 'email' && !account.isEmailVerified)
			await this.authRepository.updateAccount(account.id, {
				isEmailVerified: true,
			});

		return this.generateTokens(account.id);
	}

	private generateTokens(userId: string) {
		const payload: TokenPayload = { sub: userId };

		const accessToken = this.passportService.generate(
			String(payload.sub),
			this.ACCESS_TOKEN_TTL
		);

		const refreshToken = this.passportService.generate(
			String(payload.sub),
			this.REFRESH_TOKEN_TTL
		);

		return { accessToken: accessToken, refreshToken: refreshToken };
	}
}
