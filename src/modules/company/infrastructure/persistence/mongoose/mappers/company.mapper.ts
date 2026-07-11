import { Company } from '../../../../domain/entities/company.entity';
import { CompanyMongoDocument } from '../schemas/company.schema';
export class CompanyMapper {
  static toDomain(doc: CompanyMongoDocument): Company { return new Company(
      doc._id.toString(),
      doc.name,
      doc.description,
      doc.createdAt, doc.updatedAt,
    ); }
  static toPersistence(entity: Company): Record<string, unknown> { return {
      name: entity.name,
      description: entity.description,
    }; }
}
