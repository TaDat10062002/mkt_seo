import { PaginatedResult } from '../../common/types/paginated-result';

export interface Article {
  id: string | null;
  companyId: string;
  domainId: string;
  keywordId: string;
  subKeywordId?: string;
  title: string;
  content: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ArticleRepositoryToken = Symbol('ArticleRepository');

export interface ArticleRepository {
  create(article: Article): Promise<Article>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Article>>;
  findById(id: string): Promise<Article | null>;
  update(article: Article): Promise<Article | null>;
  delete(id: string): Promise<boolean>;
}
