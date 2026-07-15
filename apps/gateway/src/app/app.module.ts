import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthRestModule } from '@vion/auth/feature-rest';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthRestModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
