import { Module } from '@nestjs/common';

import { AccountDataAccessModule } from '@vion/api/account/data-access';

import { AccountGrpcController } from './grpc/account-grpc.controller';

@Module({
	imports: [AccountDataAccessModule],
	controllers: [AccountGrpcController],
})
export class AccountFeatureModule {}
