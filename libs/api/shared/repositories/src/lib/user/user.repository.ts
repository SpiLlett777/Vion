import { Injectable } from '@nestjs/common';

import {
	type Account,
	type AccountUpdateInput,
	PrismaService,
} from '@vion/api/auth/data-access';

@Injectable()
export class UserRepository {
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

	async updateAccount(id: string, data: AccountUpdateInput): Promise<Account> {
		return this.prismaService.account.update({ where: { id }, data: data });
	}
}
