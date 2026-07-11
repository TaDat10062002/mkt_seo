export interface SubKeywordProps {
  readonly keywordId: string;
  readonly name: string;
  readonly slug: string;
}
export class SubKeyword {
  constructor(
    public readonly id: string | null,
    public keywordId: string,
    public name: string,
    public slug: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
