import { Module } from '@nestjs/common';

import { AuthController } from '@vion/auth/feature-rest';

import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
