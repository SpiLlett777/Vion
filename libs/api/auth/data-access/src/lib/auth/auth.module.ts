import { Module } from '@nestjs/common';

import { PrismaModule, RedisModule } from '../infrastructure';

import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
	imports: [PrismaModule, RedisModule],
	providers: [AuthService, AuthRepository],
	exports: [AuthService],
})
export class AuthDataAccessModule {}
