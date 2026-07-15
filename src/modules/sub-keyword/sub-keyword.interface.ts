import { PaginatedResult } from '../../common/types/paginated-result';

export interface SubKeyword {
  id: string | null;
  keywordId: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const SubKeywordRepositoryToken = Symbol('SubKeywordRepository');

export interface SubKeywordRepository {
  create(subKeyword: SubKeyword): Promise<SubKeyword>;
  findAll(page: number, limit: number): Promise<PaginatedResult<SubKeyword>>;
  findById(id: string): Promise<SubKeyword | null>;
  update(subKeyword: SubKeyword): Promise<SubKeyword | null>;
  delete(id: string): Promise<boolean>;
}
