import { Module } from '@nestjs/common';

import { PrismaModule } from '@vion/api/auth/data-access';

import { AccountRepository } from './account/account.repository';
import { AccountService } from './account/account.service';

@Module({
	imports: [PrismaModule],
	providers: [AccountService, AccountRepository],
	exports: [AccountService],
})
export class AccountDataAccessModule {}
