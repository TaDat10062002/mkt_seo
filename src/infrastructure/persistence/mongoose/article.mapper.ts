import { Article } from '../../../modules/article/article.interface';
import { ArticleMongoDocument } from './article.schema';

export class ArticleMapper {
  static toDomain(document: ArticleMongoDocument): Article {
    return {
      id: document._id.toString(),
      companyId: document.companyId.toString(),
      domainId: document.domainId.toString(),
      keywordId: document.keywordId.toString(),
      subKeywordId: document.subKeywordId?.toString(),
      title: document.title,
      content: document.content,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(article: Article): Record<string, unknown> {
    return {
      companyId: article.companyId,
      domainId: article.domainId,
      keywordId: article.keywordId,
      subKeywordId: article.subKeywordId,
      title: article.title,
      content: article.content,
      status: article.status,
    };
  }
}
