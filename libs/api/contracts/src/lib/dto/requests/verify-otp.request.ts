import { ApiProperty } from '@nestjs/swagger';

import { IdentifierValidator } from '@vion/api/shared/validators';
import {
	IsEnum,
	IsNotEmpty,
	IsNumberString,
	IsString,
	Length,
	Validate,
} from 'class-validator';

export class VerifyOtpRequest {
	@ApiProperty({
		example: '+79264444931',
	})
	@IsString()
	@Validate(IdentifierValidator)
	public identifier: string;

	@ApiProperty({
		example: '481025',
	})
	@IsNotEmpty()
	@IsNumberString()
	@Length(6, 6)
	public code: string;

	@ApiProperty({
		example: 'phone',
		enum: ['phone', 'email'],
	})
	@IsEnum(['phone', 'email'])
	public type: 'phone' | 'email';
}
