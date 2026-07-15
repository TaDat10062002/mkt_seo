import { PaginatedResult } from '../../common/types/paginated-result';

export interface Keyword {
  id: string | null;
  domainId: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const KeywordRepositoryToken = Symbol('KeywordRepository');

export interface KeywordRepository {
  create(keyword: Keyword): Promise<Keyword>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Keyword>>;
  findById(id: string): Promise<Keyword | null>;
  update(keyword: Keyword): Promise<Keyword | null>;
  delete(id: string): Promise<boolean>;
}
