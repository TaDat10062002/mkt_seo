import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult } from '../../../../../../common/types/paginated-result';
import { Domain } from '../../../../domain/entities/domain.entity';
import { DomainRepository } from '../../../../domain/repositories/domain.repository';
import { DomainMapper } from '../mappers/domain.mapper';
import { DomainDocument, DomainMongoDocument } from '../schemas/domain.schema';
@Injectable()
export class MongooseDomainRepository implements DomainRepository {
  constructor(@InjectModel(DomainDocument.name) private readonly model: Model<DomainMongoDocument>) {}
  async create(entity: Domain) { return DomainMapper.toDomain(await this.model.create(DomainMapper.toPersistence(entity))); }
  async findAll(page: number, limit: number): Promise<PaginatedResult<Domain>> { const [docs,total]=await Promise.all([this.model.find().skip((page-1)*limit).limit(limit).sort({createdAt:-1}).exec(),this.model.countDocuments()]); return {data:docs.map(DomainMapper.toDomain),page,limit,total}; }
  async findById(id: string) { const doc=await this.model.findById(id).exec(); return doc ? DomainMapper.toDomain(doc) : null; }
  async update(entity: Domain) { const doc=await this.model.findByIdAndUpdate(entity.id,DomainMapper.toPersistence(entity),{new:true}).exec(); return doc ? DomainMapper.toDomain(doc) : null; }
  async delete(id: string) { return (await this.model.deleteOne({_id:id}).exec()).deletedCount === 1; }
}
