import { Injectable } from '@nestjs/common';

import { PrismaService } from '@vion/api-shared/infrastructure';
import {
	type Account,
	type PendingContactChange,
} from '@vion/api/auth/data-access';

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

	findPendingChange(
		accountId: string,
		type: 'email' | 'phone'
	): Promise<PendingContactChange> {
		return this.prismaService.pendingContactChange.findUniqueOrThrow({
			where: {
				accountId_type: {
					accountId: accountId,
					type: type,
				},
			},
		});
	}

	upsertPendingChange(data: {
		accountId: string;
		type: 'email' | 'phone';
		value: string;
		codeHash: string;
		expiresAt: Date;
	}): Promise<PendingContactChange> {
		return this.prismaService.pendingContactChange.upsert({
			where: {
				accountId_type: {
					accountId: data.accountId,
					type: data.type,
				},
			},
			create: data,
			update: data,
		});
	}

	deletePendingChange(
		accountId: string,
		type: 'phone' | 'email'
	): Promise<PendingContactChange> {
		return this.prismaService.pendingContactChange.delete({
			where: {
				accountId_type: {
					accountId: accountId,
					type: type,
				},
			},
		});
	}
}
