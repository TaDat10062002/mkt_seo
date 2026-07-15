import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ResourceNotFoundError } from '../../common/errors/not-found.error';
import {
  Company,
  CompanyRepository,
  CompanyRepositoryToken,
} from './company.interface';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(CompanyRepositoryToken)
    private readonly repository: CompanyRepository,
  ) {}

  create(input: CreateCompanyDto) {
    return this.repository.create({ id: null, ...input });
  }

  findAll(query: PaginationQueryDto) {
    return this.repository.findAll(query.page, query.limit);
  }

  async findOne(id: string) {
    const company = await this.repository.findById(id);

    if (!company) {
      throw new ResourceNotFoundError('Company', id);
    }

    return company;
  }

  async update(id: string, input: UpdateCompanyDto) {
    const current = await this.findOne(id);
    const company: Company = { ...current, ...input };
    const updated = await this.repository.update(company);

    if (!updated) {
      throw new ResourceNotFoundError('Company', id);
    }

    return updated;
  }

  async remove(id: string) {
    if (!(await this.repository.delete(id))) {
      throw new ResourceNotFoundError('Company', id);
    }
  }
}
