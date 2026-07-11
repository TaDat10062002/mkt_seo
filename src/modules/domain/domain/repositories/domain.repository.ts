import { PaginatedResult } from '../../../../common/types/paginated-result';
import { Domain } from '../entities/domain.entity';
export const DomainRepositoryToken = Symbol('DomainRepository');
export interface DomainRepository {
  create(entity: Domain): Promise<Domain>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Domain>>;
  findById(id: string): Promise<Domain | null>;
  update(entity: Domain): Promise<Domain | null>;
  delete(id: string): Promise<boolean>;
}
