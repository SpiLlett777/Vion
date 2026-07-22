import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaPg } from '@prisma/adapter-pg';
import type { AllConfigs } from '@vion/api/contracts';

import { PrismaClient } from '../../prisma/generated/client';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(PrismaService.name);

	constructor(private readonly configService: ConfigService<AllConfigs>) {
		const adapter = new PrismaPg({
			user: configService.get('database.user', { infer: true }),
			password: configService.get('database.password', { infer: true }),
			host: configService.get('database.host', { infer: true }),
			port: configService.get('database.port', { infer: true }),
			database: configService.get('database.name', { infer: true }),
		});

		super({ adapter: adapter });
	}

	async onModuleInit() {
		const start = Date.now();

		this.logger.log('Connecting to the database...');

		try {
			await this.$connect();

			const ms = Date.now() - start;

			this.logger.log(`Database connection established in: ${ms}ms`);
		} catch (error) {
			this.logger.error(`Failed to connect to the database: ${error}`);

			throw error;
		}
	}

	async onModuleDestroy() {
		this.logger.log('Disconnecting from the database...');

		try {
			await this.$disconnect();

			this.logger.log(`Database connection closed`);
		} catch (error) {
			this.logger.error(`Failed to disconnect from the database: ${error}`);

			throw error;
		}
	}
}
