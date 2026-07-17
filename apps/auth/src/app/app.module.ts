import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthDataAccessModule } from '@vion/auth/data-access';
import { AuthRestModule } from '@vion/auth/feature-rest';
import { AuthGrpcModule } from '@vion/feature-grpc';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: 'apps/auth/.env' }),
		AuthDataAccessModule,
		AuthGrpcModule,
		AuthRestModule,
	],
})
export class AppModule {}
