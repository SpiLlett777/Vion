import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsString, Validate } from 'class-validator';

import { IdentifierValidator } from '../../validators';

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
