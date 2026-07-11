import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
export class CreateArticleDto {

  @ApiProperty() @IsMongoId() companyId!: string;

  @ApiProperty() @IsMongoId() domainId!: string;

  @ApiProperty() @IsMongoId() keywordId!: string;
  @IsOptional()
  @ApiProperty({ required: false }) @IsMongoId() subKeywordId?: string;

  @ApiProperty() @IsString() title!: string;

  @ApiProperty() @IsString() content!: string;

  @ApiProperty() @IsString() status!: string;
}
