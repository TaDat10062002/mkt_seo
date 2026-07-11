import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CreateKeywordDto {

  @ApiProperty() @IsString() domainId!: string;

  @ApiProperty() @IsString() name!: string;

  @ApiProperty() @IsString() slug!: string;
}
