import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import type { AllConfigs } from '@vion/api/contracts';
import { join } from 'path';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService<AllConfigs>);

	const host = configService.get('grpc.host', { infer: true });
	const port = configService.get('grpc.port', { infer: true });

	const url = `${host}:${port}`;

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			package: 'auth.v1',
			protoPath: join(__dirname, 'proto/auth.proto'),
			url: url,
			loader: {
				keepCase: false,
				longs: String,
				enums: String,
				defaults: true,
				oneofs: true,
			},
		},
	});

	await app.startAllMicroservices();

	await app.init();
}

bootstrap().then();
