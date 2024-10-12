export class Country {
  private readonly id: string;
  private readonly name: string;
  private readonly isoCode: string;

  constructor(id: string, name: string, isoCode: string) {
    this.id = id;
    this.name = name;
    this.isoCode = isoCode;
  }

  public static create(id: string, name: string, isoCode: string): Country {
    return new Country(id, name, isoCode);
  }

  public static fromPrimitives(plainData: {
    id: string;
    name: string;
    isoCode: string;
  }): Country {
    return new Country(plainData.id, plainData.name, plainData.isoCode);
  }

  public toPrimitives(): { id: string; name: string; isoCode: string } {
    return {
      id: this.id,
      name: this.name,
      isoCode: this.isoCode,
    };
  }
}
