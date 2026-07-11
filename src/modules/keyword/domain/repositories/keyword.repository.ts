import { PaginatedResult } from '../../../../common/types/paginated-result';
import { Keyword } from '../entities/keyword.entity';
export const KeywordRepositoryToken = Symbol('KeywordRepository');
export interface KeywordRepository {
  create(entity: Keyword): Promise<Keyword>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Keyword>>;
  findById(id: string): Promise<Keyword | null>;
  update(entity: Keyword): Promise<Keyword | null>;
  delete(id: string): Promise<boolean>;
}
