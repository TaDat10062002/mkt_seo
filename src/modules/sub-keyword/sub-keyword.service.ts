import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ResourceNotFoundError } from '../../common/errors/not-found.error';
import { CreateSubKeywordDto } from './dto/create-sub-keyword.dto';
import { UpdateSubKeywordDto } from './dto/update-sub-keyword.dto';
import {
  SubKeyword,
  SubKeywordRepository,
  SubKeywordRepositoryToken,
} from './sub-keyword.interface';

@Injectable()
export class SubKeywordService {
  constructor(
    @Inject(SubKeywordRepositoryToken)
    private readonly repository: SubKeywordRepository,
  ) {}

  create(input: CreateSubKeywordDto) {
    return this.repository.create({ id: null, ...input });
  }

  findAll(query: PaginationQueryDto) {
    return this.repository.findAll(query.page, query.limit);
  }

  async findOne(id: string) {
    const subKeyword = await this.repository.findById(id);

    if (!subKeyword) {
      throw new ResourceNotFoundError('SubKeyword', id);
    }

    return subKeyword;
  }

  async update(id: string, input: UpdateSubKeywordDto) {
    const current = await this.findOne(id);
    const subKeyword: SubKeyword = { ...current, ...input };
    const updated = await this.repository.update(subKeyword);

    if (!updated) {
      throw new ResourceNotFoundError('SubKeyword', id);
    }

    return updated;
  }

  async remove(id: string) {
    if (!(await this.repository.delete(id))) {
      throw new ResourceNotFoundError('SubKeyword', id);
    }
  }
}
