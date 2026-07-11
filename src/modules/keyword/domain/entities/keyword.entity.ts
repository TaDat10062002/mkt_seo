export interface KeywordProps {
  readonly domainId: string;
  readonly name: string;
  readonly slug: string;
}
export class Keyword {
  constructor(
    public readonly id: string | null,
    public domainId: string,
    public name: string,
    public slug: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
