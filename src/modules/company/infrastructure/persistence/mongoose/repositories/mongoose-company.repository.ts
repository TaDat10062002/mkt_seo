import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult } from '../../../../../../common/types/paginated-result';
import { Company } from '../../../../domain/entities/company.entity';
import { CompanyRepository } from '../../../../domain/repositories/company.repository';
import { CompanyMapper } from '../mappers/company.mapper';
import { CompanyDocument, CompanyMongoDocument } from '../schemas/company.schema';
@Injectable()
export class MongooseCompanyRepository implements CompanyRepository {
  constructor(@InjectModel(CompanyDocument.name) private readonly model: Model<CompanyMongoDocument>) {}
  async create(entity: Company) { return CompanyMapper.toDomain(await this.model.create(CompanyMapper.toPersistence(entity))); }
  async findAll(page: number, limit: number): Promise<PaginatedResult<Company>> { const [docs,total]=await Promise.all([this.model.find().skip((page-1)*limit).limit(limit).sort({createdAt:-1}).exec(),this.model.countDocuments()]); return {data:docs.map(CompanyMapper.toDomain),page,limit,total}; }
  async findById(id: string) { const doc=await this.model.findById(id).exec(); return doc ? CompanyMapper.toDomain(doc) : null; }
  async update(entity: Company) { const doc=await this.model.findByIdAndUpdate(entity.id,CompanyMapper.toPersistence(entity),{new:true}).exec(); return doc ? CompanyMapper.toDomain(doc) : null; }
  async delete(id: string) { return (await this.model.deleteOne({_id:id}).exec()).deletedCount === 1; }
}
