export interface DomainProps {
  readonly companyId: string;
  readonly name: string;
  readonly url: string;
}
export class Domain {
  constructor(
    public readonly id: string | null,
    public companyId: string,
    public name: string,
    public url: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
