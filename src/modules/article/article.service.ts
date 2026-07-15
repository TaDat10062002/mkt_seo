import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ResourceNotFoundError } from '../../common/errors/not-found.error';
import { Article, ArticleRepository, ArticleRepositoryToken } from './article.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ArticleRepositoryToken)
    private readonly repository: ArticleRepository,
  ) {}

  create(input: CreateArticleDto) {
    return this.repository.create({ id: null, ...input });
  }

  findAll(query: PaginationQueryDto) {
    return this.repository.findAll(query.page, query.limit);
  }

  async findOne(id: string) {
    const article = await this.repository.findById(id);

    if (!article) {
      throw new ResourceNotFoundError('Article', id);
    }

    return article;
  }

  async update(id: string, input: UpdateArticleDto) {
    const current = await this.findOne(id);
    const article: Article = { ...current, ...input };
    const updated = await this.repository.update(article);

    if (!updated) {
      throw new ResourceNotFoundError('Article', id);
    }

    return updated;
  }

  async remove(id: string) {
    if (!(await this.repository.delete(id))) {
      throw new ResourceNotFoundError('Article', id);
    }
  }
}
