import { Module } from '@nestjs/common';

import { AuthDataAccessModule } from '@vion/auth/data-access';

import { AuthGrpcController } from './auth-grpc.controller';

@Module({
	imports: [AuthDataAccessModule],
	controllers: [AuthGrpcController],
	providers: [],
	exports: [],
})
export class AuthGrpcModule {}
