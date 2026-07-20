import { Module } from '@nestjs/common';

import { AuthRepository } from './auth/auth.repository';
import { AuthService } from './auth/auth.service';
import { PrismaModule, RedisModule } from './infrastructure';
import { OtpService } from './otp/otp.service';

@Module({
	imports: [PrismaModule, RedisModule],
	providers: [AuthService, AuthRepository, OtpService],
	exports: [AuthService],
})
export class AuthDataAccessModule {}
