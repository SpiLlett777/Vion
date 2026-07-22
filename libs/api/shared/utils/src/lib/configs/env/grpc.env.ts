import { registerAs } from '@nestjs/config';

import { GrpcConfig, GrpcValidator } from '@vion/api/contracts';

import { validateEnv } from '../../validators';

export const grpcEnv = registerAs<GrpcConfig>('grpc', () => {
	const validated = validateEnv(process.env, GrpcValidator);

	return {
		host: validated.GRPC_HOST,
		port: validated.GRPC_PORT,
	};
});
