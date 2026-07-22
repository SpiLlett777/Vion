import { registerAs } from '@nestjs/config';

import { DatabaseConfig, DatabaseValidator } from '@vion/api/contracts';

import { validateEnv } from '../../validators';

export const databaseEnv = registerAs<DatabaseConfig>('database', () => {
	const validated = validateEnv(process.env, DatabaseValidator);

	return {
		user: validated.DATABASE_USER,
		password: validated.DATABASE_PASSWORD,
		host: validated.DATABASE_HOST,
		port: validated.DATABASE_PORT,
		name: validated.DATABASE_NAME,
	};
});
