import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { CurrentUser, Protected } from '@vion/api-shared/auth-guards';
import { AccountClientGrpc } from '@vion/api/account/data-access';
import {
	ConfirmEmailChangeRequest,
	ConfirmPhoneChangeRequest,
	InitEmailChangeRequest,
	InitPhoneChangeRequest,
} from '@vion/api/contracts';
import { HttpStatusCode } from 'axios';

@Controller('account')
export class AccountRestController {
	constructor(private readonly client: AccountClientGrpc) {}

	@ApiOperation({
		summary: 'Init email change',
		description: 'Sends a confirmation code to a new email address',
	})
	@ApiBearerAuth()
	@Protected()
	@Post('email/init')
	@HttpCode(HttpStatusCode.Ok)
	async initEmailChange(
		@Body() dto: InitEmailChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.initEmailChange({ userId: userId, email: dto.email });
	}

	@ApiOperation({
		summary: 'Confirm email change',
		description: 'Verifies confirmation code and updates user email address',
	})
	@ApiBearerAuth()
	@Protected()
	@Post('email/confirm')
	@HttpCode(HttpStatusCode.Ok)
	async confirmEmailChange(
		@Body() dto: ConfirmEmailChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.confirmEmailChange({
			userId: userId,
			email: dto.email,
			code: dto.code.toString(),
		});
	}

	@ApiOperation({
		summary: 'Init phone change',
		description: 'Sends a confirmation code to a new phone number',
	})
	@ApiBearerAuth()
	@Protected()
	@Post('phone/init')
	@HttpCode(HttpStatusCode.Ok)
	async initPhoneChange(
		@Body() dto: InitPhoneChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.initPhoneChange({ userId: userId, phone: dto.phone });
	}

	@ApiOperation({
		summary: 'Confirm phone change',
		description: 'Verifies confirmation code and updates user phone number',
	})
	@ApiBearerAuth()
	@Protected()
	@Post('phone/confirm')
	@HttpCode(HttpStatusCode.Ok)
	async confirmPhoneChange(
		@Body() dto: ConfirmPhoneChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.confirmPhoneChange({
			userId: userId,
			phone: dto.phone,
			code: dto.code.toString(),
		});
	}
}
