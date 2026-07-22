import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { databaseEnv, grpcEnv, redisEnv } from '@vion/api/shared/utils';
import { AuthFeatureModule } from '@vion/auth/feature';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: 'apps/auth/.env',
			load: [databaseEnv, grpcEnv, redisEnv],
		}),
		AuthFeatureModule,
	],
})
export class AppModule {}
