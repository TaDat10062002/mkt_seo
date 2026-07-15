import { PaginatedResult } from '../../common/types/paginated-result';

export interface Company {
  id: string | null;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const CompanyRepositoryToken = Symbol('CompanyRepository');

export interface CompanyRepository {
  create(company: Company): Promise<Company>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Company>>;
  findById(id: string): Promise<Company | null>;
  update(company: Company): Promise<Company | null>;
  delete(id: string): Promise<boolean>;
}
