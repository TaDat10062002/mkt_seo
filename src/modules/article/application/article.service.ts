import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../../../common/errors/not-found.error';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { Article } from '../domain/entities/article.entity';
import { ArticleRepository, ArticleRepositoryToken } from '../domain/repositories/article.repository';
import { CreateArticleDto } from '../presentation/http/dto/create-article.dto';
import { UpdateArticleDto } from '../presentation/http/dto/update-article.dto';
@Injectable()
export class ArticleService {
  constructor(@Inject(ArticleRepositoryToken) private readonly repository: ArticleRepository) {}
  create(input: CreateArticleDto) { return this.repository.create(new Article(null,
      input.companyId,
      input.domainId,
      input.keywordId,
      input.subKeywordId,
      input.title,
      input.content,
      input.status,
    )); }
  findAll(query: PaginationQueryDto) { return this.repository.findAll(query.page,query.limit); }
  async findOne(id: string) { const item=await this.repository.findById(id); if(!item) throw new ResourceNotFoundError('Article',id); return item; }
  async update(id: string,input: UpdateArticleDto) { const current=await this.findOne(id); const item=Object.assign(Object.create(Object.getPrototypeOf(current)),current,input) as Article; const updated=await this.repository.update(item); if(!updated) throw new ResourceNotFoundError('Article',id); return updated; }
  async remove(id: string) { if(!await this.repository.delete(id)) throw new ResourceNotFoundError('Article',id); }
}
