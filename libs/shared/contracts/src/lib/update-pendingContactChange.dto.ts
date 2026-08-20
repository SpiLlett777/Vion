
import {ApiProperty} from '@nestjs/swagger'




export class UpdatePendingContactChangeDto {
  type?: string;
value?: string;
codeHash?: string;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
expiresAt?: Date;
}
