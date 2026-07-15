import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult } from '../../../common/types/paginated-result';
import {
  Domain,
  DomainRepository,
} from '../../../modules/domain/domain.interface';
import { DomainMapper } from './domain.mapper';
import { DomainDocument, DomainMongoDocument } from './domain.schema';

@Injectable()
export class MongooseDomainRepository implements DomainRepository {
  constructor(
    @InjectModel(DomainDocument.name)
    private readonly model: Model<DomainMongoDocument>,
  ) {}

  async create(domain: Domain): Promise<Domain> {
    const document = await this.model.create(DomainMapper.toPersistence(domain));
    return DomainMapper.toDomain(document);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Domain>> {
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
      data: documents.map((document) => DomainMapper.toDomain(document)),
      page,
      limit,
      total,
    };
  }

  async findById(id: string): Promise<Domain | null> {
    const document = await this.model.findById(id).exec();
    return document ? DomainMapper.toDomain(document) : null;
  }

  async update(domain: Domain): Promise<Domain | null> {
    const document = await this.model
      .findByIdAndUpdate(domain.id, DomainMapper.toPersistence(domain), {
        new: true,
      })
      .exec();
    return document ? DomainMapper.toDomain(document) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }
}
