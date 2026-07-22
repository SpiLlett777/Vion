import { registerAs } from '@nestjs/config';

import { RedisConfig, RedisValidator } from '@vion/api/contracts';

import { validateEnv } from '../../validators';

export const redisEnv = registerAs<RedisConfig>('database', () => {
	const validated = validateEnv(process.env, RedisValidator);

	return {
		user: validated.REDIS_USER,
		password: validated.REDIS_PASSWORD,
		host: validated.REDIS_HOST,
		port: validated.REDIS_PORT,
	};
});
