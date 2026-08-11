
import {Role} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class AccountDto {
  id: string ;
phone: string  | null;
email: string  | null;
isPhoneVerified: boolean ;
isEmailVerified: boolean ;
@ApiProperty({
  enum: Role,
})
role: Role ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
createdAt: Date ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
updatedAt: Date ;
}
