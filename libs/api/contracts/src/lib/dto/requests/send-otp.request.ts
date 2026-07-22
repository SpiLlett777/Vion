import { ApiProperty } from '@nestjs/swagger';

import { IdentifierValidator } from '@vion/api/shared/utils';
import { IsEnum, IsString, Validate } from 'class-validator';

export class SendOtpRequest {
	@ApiProperty({
		example: '+79264444931',
	})
	@IsString()
	@Validate(IdentifierValidator)
	public identifier: string;

	@ApiProperty({
		example: 'phone',
		enum: ['phone', 'email'],
	})
	@IsEnum(['phone', 'email'])
	public type: 'phone' | 'email';
}
