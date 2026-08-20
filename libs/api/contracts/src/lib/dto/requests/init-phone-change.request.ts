import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, Matches } from 'class-validator';

export class InitPhoneChangeRequest {
	@ApiProperty({
		example: '+79264444931',
	})
	@IsNotEmpty()
	@Matches(/^\+?\d{10,15}$/)
	phone: string;
}
