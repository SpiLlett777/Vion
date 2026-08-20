
import {ApiProperty} from '@nestjs/swagger'
import {Account} from './account.entity'


export class PendingContactChange {
  id: string ;
type: string ;
value: string ;
codeHash: string ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
expiresAt: Date ;
account?: Account ;
accountId: string ;
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
