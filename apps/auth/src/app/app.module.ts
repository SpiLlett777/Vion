import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthFeatureModule } from '@vion/auth/feature';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: 'apps/auth/.env' }),
		AuthFeatureModule,
	],
})
export class AppModule {}
