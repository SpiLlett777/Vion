import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

import {
	AccountServiceClient,
	type GetAccountRequest,
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
}
