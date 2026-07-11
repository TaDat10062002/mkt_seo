import { PaginatedResult } from '../../../../common/types/paginated-result';
import { SubKeyword } from '../entities/sub-keyword.entity';
export const SubKeywordRepositoryToken = Symbol('SubKeywordRepository');
export interface SubKeywordRepository {
  create(entity: SubKeyword): Promise<SubKeyword>;
  findAll(page: number, limit: number): Promise<PaginatedResult<SubKeyword>>;
  findById(id: string): Promise<SubKeyword | null>;
  update(entity: SubKeyword): Promise<SubKeyword | null>;
  delete(id: string): Promise<boolean>;
}
