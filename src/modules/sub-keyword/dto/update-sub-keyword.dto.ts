import { PartialType } from '@nestjs/swagger';
import { CreateSubKeywordDto } from './create-sub-keyword.dto';

export class UpdateSubKeywordDto extends PartialType(CreateSubKeywordDto) {}
