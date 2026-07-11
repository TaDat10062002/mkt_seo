import { SubKeyword } from '../../../../domain/entities/sub-keyword.entity';
import { SubKeywordMongoDocument } from '../schemas/sub-keyword.schema';
export class SubKeywordMapper {
  static toDomain(doc: SubKeywordMongoDocument): SubKeyword { return new SubKeyword(
      doc._id.toString(),
      doc.keywordId.toString(),
      doc.name,
      doc.slug,
      doc.createdAt, doc.updatedAt,
    ); }
  static toPersistence(entity: SubKeyword): Record<string, unknown> { return {
      keywordId: entity.keywordId,
      name: entity.name,
      slug: entity.slug,
    }; }
}
