export class State {
  private readonly id: string;
  private readonly name: string;
  private readonly isoCode: string;
  private readonly countryCode: string;

  constructor(id: string, name: string, isoCode: string, countryCode: string) {
    this.id = id;
    this.name = name;
    this.isoCode = isoCode;
    this.countryCode = countryCode;
  }

  public static create(
    id: string,
    name: string,
    isoCode: string,
    countryCode: string,
  ): State {
    return new State(id, name, isoCode, countryCode);
  }

  public static fromPrimitives(plainData: {
    id: string;
    name: string;
    isoCode: string;
    countryCode: string;
  }): State {
    return new State(
      plainData.id,
      plainData.name,
      plainData.isoCode,
      plainData.countryCode,
    );
  }

  public toPrimitives(): {
    id: string;
    name: string;
    isoCode: string;
    countryCode: string;
  } {
    return {
      id: this.id,
      name: this.name,
      isoCode: this.isoCode,
      countryCode: this.countryCode,
    };
  }

  public getIsoCode(): string {
    return this.isoCode;
  }
}
