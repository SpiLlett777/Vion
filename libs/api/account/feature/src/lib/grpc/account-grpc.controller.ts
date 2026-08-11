import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AccountService } from '@vion/api/account/data-access';
import type {
	GetAccountRequest,
	GetAccountResponse,
} from '@vion/api/shared/utils';

@Controller()
export class AccountGrpcController {
	constructor(private readonly accountService: AccountService) {}

	@GrpcMethod('AccountService', 'GetAccount')
	async getAccount(data: GetAccountRequest): Promise<GetAccountResponse> {
		return await this.accountService.getAccount(data);
	}
}
