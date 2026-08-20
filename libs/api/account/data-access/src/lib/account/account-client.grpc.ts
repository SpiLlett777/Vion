import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

import {
	AccountServiceClient,
	type ConfirmEmailChangeRequest,
	type ConfirmPhoneChangeRequest,
	type GetAccountRequest,
	type InitEmailChangeRequest,
	type InitPhoneChangeRequest,
} from '@vion/api/shared/utils';

@Injectable()
export class AccountClientGrpc implements OnModuleInit {
	private accountService!: AccountServiceClient;

	constructor(@Inject('ACCOUNT_PACKAGE') private readonly client: ClientGrpc) {}

	onModuleInit() {
		this.accountService =
			this.client.getService<AccountServiceClient>('AccountService');
	}

	getAccount(request: GetAccountRequest) {
		return this.accountService.getAccount(request);
	}

	initEmailChange(request: InitEmailChangeRequest) {
		return this.accountService.initEmailChange(request);
	}

	confirmEmailChange(request: ConfirmEmailChangeRequest) {
		return this.accountService.confirmEmailChange(request);
	}

	initPhoneChange(request: InitPhoneChangeRequest) {
		return this.accountService.initPhoneChange(request);
	}

	confirmPhoneChange(request: ConfirmPhoneChangeRequest) {
		return this.accountService.confirmPhoneChange(request);
	}
}
