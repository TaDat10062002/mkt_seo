import { Company } from '../../../modules/company/company.interface';
import { CompanyMongoDocument } from './company.schema';

export class CompanyMapper {
  static toDomain(document: CompanyMongoDocument): Company {
    return {
      id: document._id.toString(),
      name: document.name,
      description: document.description,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(company: Company): Record<string, unknown> {
    return {
      name: company.name,
      description: company.description,
    };
  }
}
