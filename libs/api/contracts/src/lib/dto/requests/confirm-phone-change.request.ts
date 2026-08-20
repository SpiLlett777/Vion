import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumberString, Length, Matches } from 'class-validator';

export class ConfirmPhoneChangeRequest {
	@ApiProperty({
		example: '+79264444931',
	})
	@IsNotEmpty()
	@Matches(/^\+?\d{10,15}$/)
	phone: string;

	@ApiProperty({ example: 319376 })
	@IsNotEmpty()
	@IsNumberString()
	@Length(6, 6)
	code: string;
}
