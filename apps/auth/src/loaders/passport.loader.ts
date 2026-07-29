import { ConfigService } from '@nestjs/config';

import { PassportOptions } from '@vion/api/auth-passport';
import type { AllConfigs } from '@vion/api/contracts';

export function getPassportConfig(
	configService: ConfigService<AllConfigs>
): PassportOptions {
	return {
		secretKey: configService.get('passport.secretKey', { infer: true }),
	};
}
