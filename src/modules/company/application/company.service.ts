import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../../../common/errors/not-found.error';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { Company } from '../domain/entities/company.entity';
import { CompanyRepository, CompanyRepositoryToken } from '../domain/repositories/company.repository';
import { CreateCompanyDto } from '../presentation/http/dto/create-company.dto';
import { UpdateCompanyDto } from '../presentation/http/dto/update-company.dto';
@Injectable()
export class CompanyService {
  constructor(@Inject(CompanyRepositoryToken) private readonly repository: CompanyRepository) {}
  create(input: CreateCompanyDto) { return this.repository.create(new Company(null,
      input.name,
      input.description,
    )); }
  findAll(query: PaginationQueryDto) { return this.repository.findAll(query.page,query.limit); }
  async findOne(id: string) { const item=await this.repository.findById(id); if(!item) throw new ResourceNotFoundError('Company',id); return item; }
  async update(id: string,input: UpdateCompanyDto) { const current=await this.findOne(id); const item=Object.assign(Object.create(Object.getPrototypeOf(current)),current,input) as Company; const updated=await this.repository.update(item); if(!updated) throw new ResourceNotFoundError('Company',id); return updated; }
  async remove(id: string) { if(!await this.repository.delete(id)) throw new ResourceNotFoundError('Company',id); }
}
