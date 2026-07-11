import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../../../common/errors/not-found.error';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { Domain } from '../domain/entities/domain.entity';
import { DomainRepository, DomainRepositoryToken } from '../domain/repositories/domain.repository';
import { CreateDomainDto } from '../presentation/http/dto/create-domain.dto';
import { UpdateDomainDto } from '../presentation/http/dto/update-domain.dto';
@Injectable()
export class DomainService {
  constructor(@Inject(DomainRepositoryToken) private readonly repository: DomainRepository) {}
  create(input: CreateDomainDto) { return this.repository.create(new Domain(null,
      input.companyId,
      input.name,
      input.url,
    )); }
  findAll(query: PaginationQueryDto) { return this.repository.findAll(query.page,query.limit); }
  async findOne(id: string) { const item=await this.repository.findById(id); if(!item) throw new ResourceNotFoundError('Domain',id); return item; }
  async update(id: string,input: UpdateDomainDto) { const current=await this.findOne(id); const item=Object.assign(Object.create(Object.getPrototypeOf(current)),current,input) as Domain; const updated=await this.repository.update(item); if(!updated) throw new ResourceNotFoundError('Domain',id); return updated; }
  async remove(id: string) { if(!await this.repository.delete(id)) throw new ResourceNotFoundError('Domain',id); }
}
