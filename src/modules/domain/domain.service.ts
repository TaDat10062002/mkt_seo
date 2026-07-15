import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ResourceNotFoundError } from '../../common/errors/not-found.error';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import {
  Domain,
  DomainRepository,
  DomainRepositoryToken,
} from './domain.interface';

@Injectable()
export class DomainService {
  constructor(
    @Inject(DomainRepositoryToken)
    private readonly repository: DomainRepository,
  ) {}

  create(input: CreateDomainDto) {
    return this.repository.create({ id: null, ...input });
  }

  findAll(query: PaginationQueryDto) {
    return this.repository.findAll(query.page, query.limit);
  }

  async findOne(id: string) {
    const domain = await this.repository.findById(id);

    if (!domain) {
      throw new ResourceNotFoundError('Domain', id);
    }

    return domain;
  }

  async update(id: string, input: UpdateDomainDto) {
    const current = await this.findOne(id);
    const domain: Domain = { ...current, ...input };
    const updated = await this.repository.update(domain);

    if (!updated) {
      throw new ResourceNotFoundError('Domain', id);
    }

    return updated;
  }

  async remove(id: string) {
    if (!(await this.repository.delete(id))) {
      throw new ResourceNotFoundError('Domain', id);
    }
  }
}
