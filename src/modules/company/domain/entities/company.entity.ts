export interface CompanyProps {
  readonly name: string;
  readonly description?: string;
}
export class Company {
  constructor(
    public readonly id: string | null,
    public name: string,
    public description?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
