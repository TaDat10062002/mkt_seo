import { PaginatedResult } from '../../../../common/types/paginated-result';
import { Company } from '../entities/company.entity';
export const CompanyRepositoryToken = Symbol('CompanyRepository');
export interface CompanyRepository {
  create(entity: Company): Promise<Company>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Company>>;
  findById(id: string): Promise<Company | null>;
  update(entity: Company): Promise<Company | null>;
  delete(id: string): Promise<boolean>;
}
