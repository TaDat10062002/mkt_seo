import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult } from '../../../common/types/paginated-result';
import {
  Keyword,
  KeywordRepository,
} from '../../../modules/keyword/keyword.interface';
import { KeywordMapper } from './keyword.mapper';
import { KeywordDocument, KeywordMongoDocument } from './keyword.schema';

@Injectable()
export class MongooseKeywordRepository implements KeywordRepository {
  constructor(
    @InjectModel(KeywordDocument.name)
    private readonly model: Model<KeywordMongoDocument>,
  ) {}

  async create(keyword: Keyword): Promise<Keyword> {
    const document = await this.model.create(
      KeywordMapper.toPersistence(keyword),
    );
    return KeywordMapper.toDomain(document);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Keyword>> {
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
      data: documents.map((document) => KeywordMapper.toDomain(document)),
      page,
      limit,
      total,
    };
  }

  async findById(id: string): Promise<Keyword | null> {
    const document = await this.model.findById(id).exec();
    return document ? KeywordMapper.toDomain(document) : null;
  }

  async update(keyword: Keyword): Promise<Keyword | null> {
    const document = await this.model
      .findByIdAndUpdate(keyword.id, KeywordMapper.toPersistence(keyword), {
        new: true,
      })
      .exec();
    return document ? KeywordMapper.toDomain(document) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }
}
