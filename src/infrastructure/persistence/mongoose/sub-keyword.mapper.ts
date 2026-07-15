import { SubKeyword } from '../../../modules/sub-keyword/sub-keyword.interface';
import { SubKeywordMongoDocument } from './sub-keyword.schema';

export class SubKeywordMapper {
  static toDomain(document: SubKeywordMongoDocument): SubKeyword {
    return {
      id: document._id.toString(),
      keywordId: document.keywordId.toString(),
      name: document.name,
      slug: document.slug,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(subKeyword: SubKeyword): Record<string, unknown> {
    return {
      keywordId: subKeyword.keywordId,
      name: subKeyword.name,
      slug: subKeyword.slug,
    };
  }
}
