import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { join } from 'path';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			package: 'auth.v1',
			protoPath: join(__dirname, 'proto/auth.proto'),
			url: 'localhost:50051',
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
