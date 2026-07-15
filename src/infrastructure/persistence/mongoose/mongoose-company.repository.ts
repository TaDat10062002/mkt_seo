import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult } from '../../../common/types/paginated-result';
import {
  Company,
  CompanyRepository,
} from '../../../modules/company/company.interface';
import { CompanyMapper } from './company.mapper';
import { CompanyDocument, CompanyMongoDocument } from './company.schema';

@Injectable()
export class MongooseCompanyRepository implements CompanyRepository {
  constructor(
    @InjectModel(CompanyDocument.name)
    private readonly model: Model<CompanyMongoDocument>,
  ) {}

  async create(company: Company): Promise<Company> {
    const document = await this.model.create(
      CompanyMapper.toPersistence(company),
    );
    return CompanyMapper.toDomain(document);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Company>> {
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
      data: documents.map((document) => CompanyMapper.toDomain(document)),
      page,
      limit,
      total,
    };
  }

  async findById(id: string): Promise<Company | null> {
    const document = await this.model.findById(id).exec();
    return document ? CompanyMapper.toDomain(document) : null;
  }

  async update(company: Company): Promise<Company | null> {
    const document = await this.model
      .findByIdAndUpdate(company.id, CompanyMapper.toPersistence(company), {
        new: true,
      })
      .exec();
    return document ? CompanyMapper.toDomain(document) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }
}
