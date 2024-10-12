import { ConfigService } from '@nestjs/config';
import { PlacesRepository } from '../domain/PlacesRepository';
import { Country } from '../domain/Country';

export class PlacesApiRepository implements PlacesRepository {
  private readonly baseUrl: string;
  private readonly options: RequestInit;
  private readonly configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
    this.baseUrl = this.configService.get<string>('RAPID_API_URL');
    this.options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': this.configService.get<string>('X_RAPIDAPI_KEY'),
        'x-rapidapi-host': this.configService.get<string>('X_RAPIDAPI_HOST'),
      },
    };
  }

  async findAllCountries(): Promise<Country[]> {
    const url = `${this.baseUrl}/allcountries`;
    const res = await fetch(url, this.options);
    const found = await res.json();
    return found.map((country: any) => Country.fromPrimitives({ ...country }));
  }

  async findCountryDataByCountryCode(code: string): Promise<any> {
    const url = `${this.baseUrl}/country-data-by-countrycode?countrycode=${code}`;
    const res = await fetch(url, this.options);
    const found = await res.json();
  }

  async findStatesByCountryCode(code: string): Promise<any> {
    const url = `${this.baseUrl}/states-by-countrycode?countrycode=${code}`;
    const res = await fetch(url, this.options);
    const found = await res.json();
  }

  async findCitiesByCountryCodeAndStateCode(
    countryCode: string,
    stateCode: string,
  ): Promise<any> {
    const url = `${this.baseUrl}/cities-by-countrycode-and-statecode?countrycode=${countryCode}&statecode=${stateCode}`;
    const res = await fetch(url, this.options);
    const found = await res.json();
  }
}
