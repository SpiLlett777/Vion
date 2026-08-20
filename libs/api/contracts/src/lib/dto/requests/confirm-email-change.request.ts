import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class ConfirmEmailChangeRequest {
	@ApiProperty({ example: 'example@vion.com' })
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({ example: 319376 })
	@IsNotEmpty()
	@IsNumberString()
	@Length(6, 6)
	code: string;
}
