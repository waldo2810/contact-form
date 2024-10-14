export class State {
  private readonly id: string;
  private readonly name: string;
  private readonly isoCode: string;
  private readonly countryCode: string;
  private readonly country: string;

  constructor(
    id: string,
    name: string,
    isoCode: string,
    countryCode: string,
    country: string,
  ) {
    this.id = id;
    this.name = name;
    this.isoCode = isoCode;
    this.countryCode = countryCode;
    this.country = country;
  }

  public static create(
    id: string,
    name: string,
    isoCode: string,
    countryCode: string,
    country: string,
  ): State {
    return new State(id, name, isoCode, countryCode, country);
  }

  public static fromPrimitives(plainData: {
    id: string;
    name: string;
    isoCode: string;
    countryCode: string;
    country: string;
  }): State {
    return new State(
      plainData.id,
      plainData.name,
      plainData.isoCode,
      plainData.countryCode,
      plainData.country,
    );
  }

  public toPrimitives(): {
    id: string;
    name: string;
    isoCode: string;
    countryCode: string;
    country: string;
  } {
    return {
      id: this.id,
      name: this.name,
      isoCode: this.isoCode,
      countryCode: this.countryCode,
      country: this.country,
    };
  }

  public getIsoCode(): string {
    return this.isoCode;
  }
}
