import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult } from '../../../../../../common/types/paginated-result';
import { Article } from '../../../../domain/entities/article.entity';
import { ArticleRepository } from '../../../../domain/repositories/article.repository';
import { ArticleMapper } from '../mappers/article.mapper';
import { ArticleDocument, ArticleMongoDocument } from '../schemas/article.schema';
@Injectable()
export class MongooseArticleRepository implements ArticleRepository {
  constructor(@InjectModel(ArticleDocument.name) private readonly model: Model<ArticleMongoDocument>) {}
  async create(entity: Article) { return ArticleMapper.toDomain(await this.model.create(ArticleMapper.toPersistence(entity))); }
  async findAll(page: number, limit: number): Promise<PaginatedResult<Article>> { const [docs,total]=await Promise.all([this.model.find().skip((page-1)*limit).limit(limit).sort({createdAt:-1}).exec(),this.model.countDocuments()]); return {data:docs.map(ArticleMapper.toDomain),page,limit,total}; }
  async findById(id: string) { const doc=await this.model.findById(id).exec(); return doc ? ArticleMapper.toDomain(doc) : null; }
  async update(entity: Article) { const doc=await this.model.findByIdAndUpdate(entity.id,ArticleMapper.toPersistence(entity),{new:true}).exec(); return doc ? ArticleMapper.toDomain(doc) : null; }
  async delete(id: string) { return (await this.model.deleteOne({_id:id}).exec()).deletedCount === 1; }
}
