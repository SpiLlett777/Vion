import { Injectable } from '@nestjs/common';

import { PrismaService } from '@vion/api-shared/infrastructure';

import { Account } from '../prisma';
import { type AccountCreateInput } from '../prisma/generated/models/Account';

@Injectable()
export class AuthRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async createAccount(data: AccountCreateInput): Promise<Account> {
		return this.prismaService.account.create({ data: data });
	}
}
