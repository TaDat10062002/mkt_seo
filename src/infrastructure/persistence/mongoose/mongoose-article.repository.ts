import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult } from '../../../common/types/paginated-result';
import {
  Article,
  ArticleRepository,
} from '../../../modules/article/article.interface';
import { ArticleMapper } from './article.mapper';
import { ArticleDocument, ArticleMongoDocument } from './article.schema';

@Injectable()
export class MongooseArticleRepository implements ArticleRepository {
  constructor(
    @InjectModel(ArticleDocument.name)
    private readonly model: Model<ArticleMongoDocument>,
  ) {}

  async create(article: Article): Promise<Article> {
    const document = await this.model.create(
      ArticleMapper.toPersistence(article),
    );
    return ArticleMapper.toDomain(document);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Article>> {
    const [documents, total] = await Promise.all([
      this.model
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.model.countDocuments(),
    ]);

    return {
      data: documents.map((document) => ArticleMapper.toDomain(document)),
      page,
      limit,
      total,
    };
  }

  async findById(id: string): Promise<Article | null> {
    const document = await this.model.findById(id).exec();
    return document ? ArticleMapper.toDomain(document) : null;
  }

  async update(article: Article): Promise<Article | null> {
    const document = await this.model
      .findByIdAndUpdate(article.id, ArticleMapper.toPersistence(article), {
        new: true,
      })
      .exec();
    return document ? ArticleMapper.toDomain(document) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }
}
