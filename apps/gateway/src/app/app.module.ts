import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthClientGrpc } from '@vion/auth/data-access';
import { AuthRestController } from '@vion/feature';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ClientsModule.registerAsync([
			{
				name: 'AUTH_PACKAGE',
				imports: [ConfigModule],
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'auth.v1',
						protoPath: join(__dirname, 'proto/auth.proto'),
						url: configService.getOrThrow<string>('AUTH_GRPC_URL'),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	controllers: [AppController, AuthRestController],
	providers: [AppService, AuthClientGrpc],
	exports: [AuthClientGrpc],
})
export class AppModule {}
