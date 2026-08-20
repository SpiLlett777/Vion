
import {ApiProperty} from '@nestjs/swagger'


export class PendingContactChangeDto {
  id: string ;
type: string ;
value: string ;
codeHash: string ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
expiresAt: Date ;
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
