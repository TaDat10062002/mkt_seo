import { Keyword } from '../../../modules/keyword/keyword.interface';
import { KeywordMongoDocument } from './keyword.schema';

export class KeywordMapper {
  static toDomain(document: KeywordMongoDocument): Keyword {
    return {
      id: document._id.toString(),
      domainId: document.domainId.toString(),
      name: document.name,
      slug: document.slug,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(keyword: Keyword): Record<string, unknown> {
    return {
      domainId: keyword.domainId,
      name: keyword.name,
      slug: keyword.slug,
    };
  }
}
