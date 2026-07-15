import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ResourceNotFoundError } from '../../common/errors/not-found.error';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import {
  Keyword,
  KeywordRepository,
  KeywordRepositoryToken,
} from './keyword.interface';

@Injectable()
export class KeywordService {
  constructor(
    @Inject(KeywordRepositoryToken)
    private readonly repository: KeywordRepository,
  ) {}

  create(input: CreateKeywordDto) {
    return this.repository.create({ id: null, ...input });
  }

  findAll(query: PaginationQueryDto) {
    return this.repository.findAll(query.page, query.limit);
  }

  async findOne(id: string) {
    const keyword = await this.repository.findById(id);

    if (!keyword) {
      throw new ResourceNotFoundError('Keyword', id);
    }

    return keyword;
  }

  async update(id: string, input: UpdateKeywordDto) {
    const current = await this.findOne(id);
    const keyword: Keyword = { ...current, ...input };
    const updated = await this.repository.update(keyword);

    if (!updated) {
      throw new ResourceNotFoundError('Keyword', id);
    }

    return updated;
  }

  async remove(id: string) {
    if (!(await this.repository.delete(id))) {
      throw new ResourceNotFoundError('Keyword', id);
    }
  }
}
