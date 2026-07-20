import { Injectable } from '@nestjs/common';

import { PrismaService } from '../infrastructure';
import { Account } from '../prisma/generated/client';
import {
	AccountCreateInput,
	AccountUpdateInput,
} from '../prisma/generated/models/Account';

@Injectable()
export class AuthRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async findByPhone(phone: string): Promise<Account | null> {
		return this.prismaService.account.findUnique({
			where: { phone: phone },
		});
	}

	async findByEmail(email: string): Promise<Account | null> {
		return this.prismaService.account.findUnique({
			where: { email: email },
		});
	}

	async createAccount(data: AccountCreateInput): Promise<Account> {
		return this.prismaService.account.create({ data: data });
	}

	async updateAccount(id: string, data: AccountUpdateInput): Promise<Account> {
		return this.prismaService.account.update({ where: { id }, data: data });
	}
}
