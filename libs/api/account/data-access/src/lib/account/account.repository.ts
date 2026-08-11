import { Injectable } from '@nestjs/common';

import { Account, PrismaService } from '@vion/api/auth/data-access';

@Injectable()
export class AccountRepository {
	constructor(private readonly prismaService: PrismaService) {}

	findById(id: string): Promise<Account | null> {
		return this.prismaService.account.findUnique({
			where: {
				id: id,
			},
		});
	}
}
