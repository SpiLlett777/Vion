import { Module } from '@nestjs/common';

import { PrismaModule, RedisModule } from '@vion/api-shared/infrastructure';
import { UserRepository } from '@vion/api-shared/repositories';

import { AuthRepository } from './auth/auth.repository';
import { AuthService } from './auth/auth.service';
import { OtpService } from './otp/otp.service';

@Module({
	imports: [PrismaModule, RedisModule],
	providers: [AuthService, AuthRepository, UserRepository, OtpService],
	exports: [AuthService],
})
export class AuthDataAccessModule {}
