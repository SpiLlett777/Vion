import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@vion/api-shared/auth-passport';
import { AccountFeatureModule } from '@vion/api/account/feature';
import { AuthFeatureModule } from '@vion/api/auth/feature';
import {
	databaseEnv,
	grpcEnv,
	passportEnv,
	redisEnv,
} from '@vion/api/shared/utils';

import { getPassportConfig } from '../loaders';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: 'apps/auth/.env',
			load: [databaseEnv, grpcEnv, passportEnv, redisEnv],
		}),
		AuthFeatureModule,
		AccountFeatureModule,
		PassportModule.registerAsync({
			useFactory: getPassportConfig,
			inject: [ConfigService],
		}),
	],
})
export class AppModule {}
