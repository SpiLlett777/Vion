
import {Role} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {PendingContactChange} from './pendingContactChange.entity'


export class Account {
  id: string ;
phone: string  | null;
email: string  | null;
isPhoneVerified: boolean ;
isEmailVerified: boolean ;
@ApiProperty({
  enum: Role,
})
role: Role ;
pendingContactChanges?: PendingContactChange[] ;
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
