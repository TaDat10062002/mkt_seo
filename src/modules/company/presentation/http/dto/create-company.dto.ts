import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CreateCompanyDto {

  @ApiProperty() @IsString() name!: string;
  @IsOptional()
  @ApiProperty({ required: false }) @IsString() description?: string;
}
