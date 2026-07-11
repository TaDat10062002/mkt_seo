import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult } from '../../../../../../common/types/paginated-result';
import { SubKeyword } from '../../../../domain/entities/sub-keyword.entity';
import { SubKeywordRepository } from '../../../../domain/repositories/sub-keyword.repository';
import { SubKeywordMapper } from '../mappers/sub-keyword.mapper';
import { SubKeywordDocument, SubKeywordMongoDocument } from '../schemas/sub-keyword.schema';
@Injectable()
export class MongooseSubKeywordRepository implements SubKeywordRepository {
  constructor(@InjectModel(SubKeywordDocument.name) private readonly model: Model<SubKeywordMongoDocument>) {}
  async create(entity: SubKeyword) { return SubKeywordMapper.toDomain(await this.model.create(SubKeywordMapper.toPersistence(entity))); }
  async findAll(page: number, limit: number): Promise<PaginatedResult<SubKeyword>> { const [docs,total]=await Promise.all([this.model.find().skip((page-1)*limit).limit(limit).sort({createdAt:-1}).exec(),this.model.countDocuments()]); return {data:docs.map(SubKeywordMapper.toDomain),page,limit,total}; }
  async findById(id: string) { const doc=await this.model.findById(id).exec(); return doc ? SubKeywordMapper.toDomain(doc) : null; }
  async update(entity: SubKeyword) { const doc=await this.model.findByIdAndUpdate(entity.id,SubKeywordMapper.toPersistence(entity),{new:true}).exec(); return doc ? SubKeywordMapper.toDomain(doc) : null; }
  async delete(id: string) { return (await this.model.deleteOne({_id:id}).exec()).deletedCount === 1; }
}
