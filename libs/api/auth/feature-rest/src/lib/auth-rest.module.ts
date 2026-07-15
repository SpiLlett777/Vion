import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthDataAccessModule } from '@vion/auth/data-access';
import { join } from 'path';

import { AuthRestController } from './auth-rest.controller';
import { AuthClientGrpc } from './auth.grpc';

@Module({
	imports: [
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
		AuthDataAccessModule,
	],
	controllers: [AuthRestController],
	providers: [AuthClientGrpc],
})
export class AuthRestModule {}
