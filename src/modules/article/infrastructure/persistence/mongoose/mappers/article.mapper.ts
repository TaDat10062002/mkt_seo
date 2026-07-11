import { Article } from '../../../../domain/entities/article.entity';
import { ArticleMongoDocument } from '../schemas/article.schema';
export class ArticleMapper {
  static toDomain(doc: ArticleMongoDocument): Article { return new Article(
      doc._id.toString(),
      doc.companyId.toString(),
      doc.domainId.toString(),
      doc.keywordId.toString(),
      doc.subKeywordId?.toString(),
      doc.title,
      doc.content,
      doc.status,
      doc.createdAt, doc.updatedAt,
    ); }
  static toPersistence(entity: Article): Record<string, unknown> { return {
      companyId: entity.companyId,
      domainId: entity.domainId,
      keywordId: entity.keywordId,
      subKeywordId: entity.subKeywordId,
      title: entity.title,
      content: entity.content,
      status: entity.status,
    }; }
}
