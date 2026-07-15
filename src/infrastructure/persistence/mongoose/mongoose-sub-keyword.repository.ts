import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult } from '../../../common/types/paginated-result';
import {
  SubKeyword,
  SubKeywordRepository,
} from '../../../modules/sub-keyword/sub-keyword.interface';
import { SubKeywordMapper } from './sub-keyword.mapper';
import {
  SubKeywordDocument,
  SubKeywordMongoDocument,
} from './sub-keyword.schema';

@Injectable()
export class MongooseSubKeywordRepository implements SubKeywordRepository {
  constructor(
    @InjectModel(SubKeywordDocument.name)
    private readonly model: Model<SubKeywordMongoDocument>,
  ) {}

  async create(subKeyword: SubKeyword): Promise<SubKeyword> {
    const document = await this.model.create(
      SubKeywordMapper.toPersistence(subKeyword),
    );
    return SubKeywordMapper.toDomain(document);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<SubKeyword>> {
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
      data: documents.map((document) =>
        SubKeywordMapper.toDomain(document),
      ),
      page,
      limit,
      total,
    };
  }

  async findById(id: string): Promise<SubKeyword | null> {
    const document = await this.model.findById(id).exec();
    return document ? SubKeywordMapper.toDomain(document) : null;
  }

  async update(subKeyword: SubKeyword): Promise<SubKeyword | null> {
    const document = await this.model
      .findByIdAndUpdate(
        subKeyword.id,
        SubKeywordMapper.toPersistence(subKeyword),
        { new: true },
      )
      .exec();
    return document ? SubKeywordMapper.toDomain(document) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }
}
