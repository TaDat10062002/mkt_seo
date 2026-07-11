import { Domain } from '../../../../domain/entities/domain.entity';
import { DomainMongoDocument } from '../schemas/domain.schema';
export class DomainMapper {
  static toDomain(doc: DomainMongoDocument): Domain { return new Domain(
      doc._id.toString(),
      doc.companyId.toString(),
      doc.name,
      doc.url,
      doc.createdAt, doc.updatedAt,
    ); }
  static toPersistence(entity: Domain): Record<string, unknown> { return {
      companyId: entity.companyId,
      name: entity.name,
      url: entity.url,
    }; }
}
