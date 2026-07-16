import { ApiProperty } from '@nestjs/swagger';

export class Account {
	id: string;
	phone: string | null;
	email: string | null;
	isPhoneVerified: boolean;
	isEmailVerified: boolean;
	@ApiProperty({
		type: `string`,
		format: `date-time`,
	})
	createdAt: Date;
	@ApiProperty({
		type: `string`,
		format: `date-time`,
	})
	updatedAt: Date;
}
