import { registerAs } from '@nestjs/config';

import { type PassportConfig, PassportValidator } from '@vion/api/contracts';

import { validateEnv } from '../../validators';

export const passportEnv = registerAs<PassportConfig>('passport', () => {
	const validated = validateEnv(process.env, PassportValidator);

	return {
		secretKey: validated.PASSPORT_SECRET_KEY,
		accessTtl: validated.PASSPORT_ACCESS_TTL,
		refreshTtl: validated.PASSPORT_REFRESH_TTL,
	};
});
