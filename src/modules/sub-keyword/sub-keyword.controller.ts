import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { DomainExceptionFilter } from '../../common/filters/domain-exception.filter';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import { CreateSubKeywordDto } from './dto/create-sub-keyword.dto';
import { UpdateSubKeywordDto } from './dto/update-sub-keyword.dto';
import { SubKeywordService } from './sub-keyword.service';

@ApiTags('SubKeyword')
@UseFilters(DomainExceptionFilter)
@Controller('sub-keywords')
export class SubKeywordController {
  constructor(private readonly service: SubKeywordService) {}

  @Post()
  create(@Body() dto: CreateSubKeywordDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateSubKeywordDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.service.remove(id);
  }
}
