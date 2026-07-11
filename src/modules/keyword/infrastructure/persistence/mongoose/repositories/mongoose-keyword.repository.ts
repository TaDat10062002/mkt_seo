import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult } from '../../../../../../common/types/paginated-result';
import { Keyword } from '../../../../domain/entities/keyword.entity';
import { KeywordRepository } from '../../../../domain/repositories/keyword.repository';
import { KeywordMapper } from '../mappers/keyword.mapper';
import { KeywordDocument, KeywordMongoDocument } from '../schemas/keyword.schema';
@Injectable()
export class MongooseKeywordRepository implements KeywordRepository {
  constructor(@InjectModel(KeywordDocument.name) private readonly model: Model<KeywordMongoDocument>) {}
  async create(entity: Keyword) { return KeywordMapper.toDomain(await this.model.create(KeywordMapper.toPersistence(entity))); }
  async findAll(page: number, limit: number): Promise<PaginatedResult<Keyword>> { const [docs,total]=await Promise.all([this.model.find().skip((page-1)*limit).limit(limit).sort({createdAt:-1}).exec(),this.model.countDocuments()]); return {data:docs.map(KeywordMapper.toDomain),page,limit,total}; }
  async findById(id: string) { const doc=await this.model.findById(id).exec(); return doc ? KeywordMapper.toDomain(doc) : null; }
  async update(entity: Keyword) { const doc=await this.model.findByIdAndUpdate(entity.id,KeywordMapper.toPersistence(entity),{new:true}).exec(); return doc ? KeywordMapper.toDomain(doc) : null; }
  async delete(id: string) { return (await this.model.deleteOne({_id:id}).exec()).deletedCount === 1; }
}
