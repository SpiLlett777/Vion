import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import {
	convertEnum,
	type GetAccountRequest,
	RpcStatus,
} from '@vion/api/shared/utils';

import { AccountRepository } from './account.repository';

enum Role {
	USER = 0,
	ADMIN = 1,
	UNRECOGNIZED = -1,
}

@Injectable()
export class AccountService {
	constructor(private readonly accountRepository: AccountRepository) {}

	async getAccount(data: GetAccountRequest) {
		const { id } = data;

		const account = await this.accountRepository.findById(id);

		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Account not found',
			});

		return {
			id: account.id,
			phone: account.phone ?? '',
			email: account.email ?? '',
			isPhoneVerified: account.isPhoneVerified,
			isEmailVerified: account.isEmailVerified,
			role: convertEnum(Role, account.role),
		};
	}
}
