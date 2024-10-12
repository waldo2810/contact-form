import { Country } from '../domain/Country';

export class CountryResponse {
  private readonly id: string;
  private readonly name: string;
  private readonly isoCode: string;

  constructor(country: Country) {
    const primitive = country.toPrimitives();
    this.id = primitive.id;
    this.name = primitive.name;
    this.isoCode = primitive.isoCode;
  }
}
