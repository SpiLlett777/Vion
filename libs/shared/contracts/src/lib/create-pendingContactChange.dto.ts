
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreatePendingContactChangeDto {
  type: string;
value: string;
codeHash: string;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
expiresAt: Date;
}
