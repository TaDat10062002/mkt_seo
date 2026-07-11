import { PaginatedResult } from '../../../../common/types/paginated-result';
import { Article } from '../entities/article.entity';
export const ArticleRepositoryToken = Symbol('ArticleRepository');
export interface ArticleRepository {
  create(entity: Article): Promise<Article>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Article>>;
  findById(id: string): Promise<Article | null>;
  update(entity: Article): Promise<Article | null>;
  delete(id: string): Promise<boolean>;
}
