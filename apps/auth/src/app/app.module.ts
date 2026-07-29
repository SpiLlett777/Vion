import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@vion/api/auth-passport';
import {
	databaseEnv,
	grpcEnv,
	passportEnv,
	redisEnv,
} from '@vion/api/shared/utils';
import { AuthFeatureModule } from '@vion/auth/feature';

import { getPassportConfig } from '../loaders';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: 'apps/auth/.env',
			load: [databaseEnv, grpcEnv, passportEnv, redisEnv],
		}),
		AuthFeatureModule,
		PassportModule.registerAsync({
			useFactory: getPassportConfig,
			inject: [ConfigService],
		}),
	],
})
export class AppModule {}
