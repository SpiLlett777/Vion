import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService);
	const logger = new Logger();

	app.enableCors({
		origin: config.getOrThrow<string>('HTTP_CORS').split(','),
		credentials: true,
	});

	const port = config.getOrThrow<number>('HTTP_PORT');
	const host = config.getOrThrow<string>('HTTP_HOST');

	await app.listen(port);

	logger.log(`🚀 Gateway Started: ${host}`);
	logger.log(`📝 Swagger Docs: ${host}/docs`);
}

bootstrap().then();
