import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AccountService } from '@vion/api/account/data-access';
import type {
	ConfirmEmailChangeRequest,
	ConfirmEmailChangeResponse,
	ConfirmPhoneChangeRequest,
	ConfirmPhoneChangeResponse,
	GetAccountRequest,
	GetAccountResponse,
	InitEmailChangeRequest,
	InitEmailChangeResponse,
	InitPhoneChangeRequest,
	InitPhoneChangeResponse,
} from '@vion/api/shared/utils';

@Controller()
export class AccountGrpcController {
	constructor(private readonly accountService: AccountService) {}

	@GrpcMethod('AccountService', 'GetAccount')
	async getAccount(data: GetAccountRequest): Promise<GetAccountResponse> {
		return await this.accountService.getAccount(data);
	}

	@GrpcMethod('AccountService', 'InitEmailChange')
	async initEmailChange(
		data: InitEmailChangeRequest
	): Promise<InitEmailChangeResponse> {
		return await this.accountService.initEmailChange(data);
	}

	@GrpcMethod('AccountService', 'ConfirmEmailChange')
	async confirmEmailChange(
		data: ConfirmEmailChangeRequest
	): Promise<ConfirmEmailChangeResponse> {
		return await this.accountService.confirmEmailChange(data);
	}

	@GrpcMethod('AccountService', 'InitPhoneChange')
	async initPhoneChange(
		data: InitPhoneChangeRequest
	): Promise<InitPhoneChangeResponse> {
		return await this.accountService.initPhoneChange(data);
	}

	@GrpcMethod('AccountService', 'ConfirmPhoneChange')
	async confirmPhoneChange(
		data: ConfirmPhoneChangeRequest
	): Promise<ConfirmPhoneChangeResponse> {
		return await this.accountService.confirmPhoneChange(data);
	}
}
