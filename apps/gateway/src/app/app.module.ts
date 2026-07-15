import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthRestModule } from '@vion/auth/feature-rest';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthRestModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
