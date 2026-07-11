import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';
export class CreateKeywordDto {

  @ApiProperty() @IsMongoId() domainId!: string;

  @ApiProperty() @IsString() name!: string;

  @ApiProperty() @IsString() slug!: string;
}
