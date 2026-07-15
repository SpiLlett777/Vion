import { Module } from '@nestjs/common';

import { AuthRestModule } from '@vion/auth/feature-rest';
import { AuthGrpcModule } from '@vion/feature-grpc';

@Module({
	imports: [AuthGrpcModule, AuthRestModule],
})
export class AppModule {}
