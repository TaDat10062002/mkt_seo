import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../../../common/errors/not-found.error';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { SubKeyword } from '../domain/entities/sub-keyword.entity';
import { SubKeywordRepository, SubKeywordRepositoryToken } from '../domain/repositories/sub-keyword.repository';
import { CreateSubKeywordDto } from '../presentation/http/dto/create-sub-keyword.dto';
import { UpdateSubKeywordDto } from '../presentation/http/dto/update-sub-keyword.dto';
@Injectable()
export class SubKeywordService {
  constructor(@Inject(SubKeywordRepositoryToken) private readonly repository: SubKeywordRepository) {}
  create(input: CreateSubKeywordDto) { return this.repository.create(new SubKeyword(null,
      input.keywordId,
      input.name,
      input.slug,
    )); }
  findAll(query: PaginationQueryDto) { return this.repository.findAll(query.page,query.limit); }
  async findOne(id: string) { const item=await this.repository.findById(id); if(!item) throw new ResourceNotFoundError('SubKeyword',id); return item; }
  async update(id: string,input: UpdateSubKeywordDto) { const current=await this.findOne(id); const item=Object.assign(Object.create(Object.getPrototypeOf(current)),current,input) as SubKeyword; const updated=await this.repository.update(item); if(!updated) throw new ResourceNotFoundError('SubKeyword',id); return updated; }
  async remove(id: string) { if(!await this.repository.delete(id)) throw new ResourceNotFoundError('SubKeyword',id); }
}
