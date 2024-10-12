import { City } from '../domain/City';

export class CityResponse {
  private readonly id: string;
  private readonly name: string;
  private readonly stateCode: string;
  private readonly countryCode: string;

  constructor(city: City) {
    const primitive = city.toPrimitives();
    this.id = primitive.id;
    this.name = primitive.name;
    this.stateCode = primitive.stateCode;
    this.countryCode = primitive.countryCode;
  }

  public getName(): string {
    return this.name;
  }
}
