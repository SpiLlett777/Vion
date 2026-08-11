import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '@vion/api-shared/auth-guards';
import { AccountClientGrpc } from '@vion/api/account/data-access';
import type { Role } from '@vion/api/shared/utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly accountClient: AccountClientGrpc
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!required || required.length === 0) return true;

		const request = context.switchToHttp().getRequest();

		const user = request.user;

		if (!user) throw new ForbiddenException('User context missing');

		const account = await lastValueFrom(
			this.accountClient.getAccount({ id: user.id })
		);

		if (!account) throw new NotFoundException('Account not found');

		if (!required.includes(account.role))
			throw new ForbiddenException(
				'You do not have permission to access this resource'
			);

		return true;
	}
}
