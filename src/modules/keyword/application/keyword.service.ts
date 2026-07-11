import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../../../common/errors/not-found.error';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { Keyword } from '../domain/entities/keyword.entity';
import { KeywordRepository, KeywordRepositoryToken } from '../domain/repositories/keyword.repository';
import { CreateKeywordDto } from '../presentation/http/dto/create-keyword.dto';
import { UpdateKeywordDto } from '../presentation/http/dto/update-keyword.dto';
@Injectable()
export class KeywordService {
  constructor(@Inject(KeywordRepositoryToken) private readonly repository: KeywordRepository) {}
  create(input: CreateKeywordDto) { return this.repository.create(new Keyword(null,
      input.domainId,
      input.name,
      input.slug,
    )); }
  findAll(query: PaginationQueryDto) { return this.repository.findAll(query.page,query.limit); }
  async findOne(id: string) { const item=await this.repository.findById(id); if(!item) throw new ResourceNotFoundError('Keyword',id); return item; }
  async update(id: string,input: UpdateKeywordDto) { const current=await this.findOne(id); const item=Object.assign(Object.create(Object.getPrototypeOf(current)),current,input) as Keyword; const updated=await this.repository.update(item); if(!updated) throw new ResourceNotFoundError('Keyword',id); return updated; }
  async remove(id: string) { if(!await this.repository.delete(id)) throw new ResourceNotFoundError('Keyword',id); }
}
