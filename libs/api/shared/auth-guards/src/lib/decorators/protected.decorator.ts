import { applyDecorators, UseGuards } from '@nestjs/common';

import type { Role } from '@vion/api/shared/utils';

import { AuthGuard, RolesGuard } from '../guards';

import { Roles } from './roles.decorator';

export const Protected = (...roles: Role[]) => {
	if (roles.length === 0) return applyDecorators(UseGuards(AuthGuard));

	return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
};
