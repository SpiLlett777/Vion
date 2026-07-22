import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { getCorsConfig, getValidationPipeConfig } from './configs/';
import { GrpcExceptionFilter } from '@vion/api/shared/utils';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService);
	const logger = new Logger();

	app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()));

	app.useGlobalFilters(new GrpcExceptionFilter())

	app.enableCors(getCorsConfig(config));

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Vion API')
		.setDescription('API Gateway for Vion microservices')
		.setVersion('1.0.0')
		.addBearerAuth()
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup('/docs', app, swaggerDocument, {
		yamlDocumentUrl: '/openapi.yaml',
		jsonDocumentUrl: '/openapi.json',
	});

	const port = config.getOrThrow<number>('HTTP_PORT');
	const host = config.getOrThrow<string>('HTTP_HOST');

	await app.listen(port);

	logger.log(`🚀 Gateway Started: ${host}`);
	logger.log(`📝 Swagger Docs: ${host}/docs`);
}

bootstrap().then();
