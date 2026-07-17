import { Module } from '@nestjs/common';

import { PrismaModule } from '../infrustructure';

import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
	imports: [PrismaModule],
	providers: [AuthService, AuthRepository],
	exports: [AuthService],
})
export class AuthDataAccessModule {}
