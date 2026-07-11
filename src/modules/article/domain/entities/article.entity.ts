export interface ArticleProps {
  readonly companyId: string;
  readonly domainId: string;
  readonly keywordId: string;
  readonly subKeywordId?: string;
  readonly title: string;
  readonly content: string;
  readonly status: string;
}
export class Article {
  constructor(
    public readonly id: string | null,
    public companyId: string,
    public domainId: string,
    public keywordId: string,
    public subKeywordId: string | undefined,
    public title: string,
    public content: string,
    public status: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
