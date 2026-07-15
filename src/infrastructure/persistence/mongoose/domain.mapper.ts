import { Domain } from '../../../modules/domain/domain.interface';
import { DomainMongoDocument } from './domain.schema';

export class DomainMapper {
  static toDomain(document: DomainMongoDocument): Domain {
    return {
      id: document._id.toString(),
      companyId: document.companyId.toString(),
      name: document.name,
      url: document.url,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(domain: Domain): Record<string, unknown> {
    return {
      companyId: domain.companyId,
      name: domain.name,
      url: domain.url,
    };
  }
}
