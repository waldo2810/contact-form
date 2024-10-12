export class City {
  private readonly id: string;
  private readonly name: string;
  private readonly stateCode: string;
  private readonly countryCode: string;

  constructor(
    id: string,
    name: string,
    stateCode: string,
    countryCode: string,
  ) {
    this.id = id;
    this.name = name;
    this.stateCode = stateCode;
    this.countryCode = countryCode;
  }

  public static create(
    id: string,
    name: string,
    stateCode: string,
    countryCode: string,
  ): City {
    return new City(id, name, stateCode, countryCode);
  }

  public static fromPrimitives(plainData: {
    id: string;
    name: string;
    stateCode: string;
    countryCode: string;
  }): City {
    return new City(
      plainData.id,
      plainData.name,
      plainData.stateCode,
      plainData.countryCode,
    );
  }

  public toPrimitives(): {
    id: string;
    name: string;
    stateCode: string;
    countryCode: string;
  } {
    return {
      id: this.id,
      name: this.name,
      stateCode: this.stateCode,
      countryCode: this.countryCode,
    };
  }

  public getName(): string {
    return this.name;
  }
}
