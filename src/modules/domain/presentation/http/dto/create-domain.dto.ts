import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CreateDomainDto {

  @ApiProperty() @IsString() companyId!: string;

  @ApiProperty() @IsString() name!: string;

  @ApiProperty() @IsString() url!: string;
}
