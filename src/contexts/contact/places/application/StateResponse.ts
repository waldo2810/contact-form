import { State } from '../domain/State';

export class StateResponse {
  private readonly id: string;
  private readonly name: string;
  private readonly isoCode: string;
  private readonly countryCode: string;

  constructor(country: State) {
    const primitive = country.toPrimitives();
    this.id = primitive.id;
    this.name = primitive.name;
    this.isoCode = primitive.isoCode;
    this.countryCode = primitive.countryCode;
  }

  public getIsoCode(): string {
    return this.isoCode;
  }
}
