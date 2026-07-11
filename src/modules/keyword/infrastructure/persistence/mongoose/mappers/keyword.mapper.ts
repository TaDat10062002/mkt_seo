import { Keyword } from '../../../../domain/entities/keyword.entity';
import { KeywordMongoDocument } from '../schemas/keyword.schema';
export class KeywordMapper {
  static toDomain(doc: KeywordMongoDocument): Keyword { return new Keyword(
      doc._id.toString(),
      doc.domainId.toString(),
      doc.name,
      doc.slug,
      doc.createdAt, doc.updatedAt,
    ); }
  static toPersistence(entity: Keyword): Record<string, unknown> { return {
      domainId: entity.domainId,
      name: entity.name,
      slug: entity.slug,
    }; }
}
