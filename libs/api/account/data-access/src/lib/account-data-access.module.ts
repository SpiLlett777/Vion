import { Module } from '@nestjs/common';

import { PrismaModule } from '@vion/api-shared/infrastructure';
import { UserRepository } from '@vion/api-shared/repositories';
import { OtpService } from '@vion/api/auth/data-access';

import { AccountRepository } from './account/account.repository';
import { AccountService } from './account/account.service';

@Module({
	imports: [PrismaModule],
	providers: [AccountService, AccountRepository, UserRepository, OtpService],
	exports: [AccountService],
})
export class AccountDataAccessModule {}
