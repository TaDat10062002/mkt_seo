import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';
export class CreateDomainDto {

  @ApiProperty() @IsMongoId() companyId!: string;

  @ApiProperty() @IsString() name!: string;

  @ApiProperty() @IsString() url!: string;
}
