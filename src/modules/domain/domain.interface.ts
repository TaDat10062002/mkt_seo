import { PaginatedResult } from '../../common/types/paginated-result';

export interface Domain {
  id: string | null;
  companyId: string;
  name: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const DomainRepositoryToken = Symbol('DomainRepository');

export interface DomainRepository {
  create(domain: Domain): Promise<Domain>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Domain>>;
  findById(id: string): Promise<Domain | null>;
  update(domain: Domain): Promise<Domain | null>;
  delete(id: string): Promise<boolean>;
}
