import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';

import { PassportService } from '@vion/api-shared/auth-passport';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly passportService: PassportService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();

		const token = this.extractToken(request);

		if (!token) throw new UnauthorizedException('Token not provided');

		const result = this.passportService.verify(token);

		if (!result.valid) throw new UnauthorizedException(result.reason);

		request.user = {
			id: result.userId,
		};

		return true;
	}

	private extractToken(request: Request) {
		const header = request.headers.authorization;

		if (!header)
			throw new UnauthorizedException('Authorization header missing');

		if (!header.startsWith('Bearer '))
			throw new UnauthorizedException('Invalid authorization');

		return header.replace(/^Bearer\s+/i, '').trim();
	}
}
