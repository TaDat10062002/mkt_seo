import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CreateSubKeywordDto {

  @ApiProperty() @IsString() keywordId!: string;

  @ApiProperty() @IsString() name!: string;

  @ApiProperty() @IsString() slug!: string;
}
