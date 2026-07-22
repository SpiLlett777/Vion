import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { grpcEnv } from '@vion/api/shared/utils';
import { AuthFeatureModule } from '@vion/auth/feature';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: 'apps/auth/.env',
			load: [grpcEnv],
		}),
		AuthFeatureModule,
	],
})
export class AppModule {}
