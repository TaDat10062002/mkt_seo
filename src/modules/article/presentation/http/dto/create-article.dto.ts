import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CreateArticleDto {

  @ApiProperty() @IsString() companyId!: string;

  @ApiProperty() @IsString() domainId!: string;

  @ApiProperty() @IsString() keywordId!: string;
  @IsOptional()
  @ApiProperty({ required: false }) @IsString() subKeywordId?: string;

  @ApiProperty() @IsString() title!: string;

  @ApiProperty() @IsString() content!: string;

  @ApiProperty() @IsString() status!: string;
}
