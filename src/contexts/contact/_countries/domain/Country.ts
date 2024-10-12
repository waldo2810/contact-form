export class Country {
  private readonly id: string;
  private readonly name: string;
  private readonly code: string;

  constructor(id: string, name: string, code: string) {
    this.id = id;
    this.name = name;
    this.code = code;
  }

  public static create(id: string, name: string, code: string): Country {
    return new Country(id, name, code);
  }

  public static fromPrimitives(plainData: {
    id: string;
    name: string;
    code: string;
  }): Country {
    return new Country(plainData.id, plainData.name, plainData.code);
  }

  public toPrimitives(): { id: string; name: string; code: string } {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
    };
  }
}

// {
//   name: 'Honduras',
//   isoCode: 'HN',
//   flag: '🇭🇳',
//   phonecode: '504',
//   currency: 'HNL',
//   latitude: '15.00000000',
//   longitude: '-86.50000000',
//   timezones: [ [Object] ]
// },
