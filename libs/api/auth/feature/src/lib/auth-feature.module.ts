import { Module } from '@nestjs/common';

import { AuthDataAccessModule } from '@vion/auth/data-access';

import { AuthGrpcController } from './grpc/auth-grpc.controller';

@Module({
	imports: [AuthDataAccessModule],
	controllers: [AuthGrpcController],
})
export class AuthFeatureModule {}
