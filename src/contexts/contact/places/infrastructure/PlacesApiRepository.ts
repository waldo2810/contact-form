import { ConfigService } from '@nestjs/config';
import { City } from '../domain/City';
import { Country } from '../domain/Country';
import { PlacesRepository } from '../domain/PlacesRepository';
import { State } from '../domain/State';
import { CountryNotFoundException } from '../domain/exceptions/CountryNotFoundException';

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

  async findCountryDataByCountryCode(code: string): Promise<Country> {
    const url = `${this.baseUrl}/country-data-by-countrycode?countrycode=${code}`;
    const res = await fetch(url, this.options);
    const found = await res.json();
    if (typeof found !== 'object') {
      throw new CountryNotFoundException(code);
    }
    return Country.fromPrimitives({ ...found });
  }

  async findStatesByCountryCode(code: string): Promise<State[]> {
    const url = `${this.baseUrl}/states-by-countrycode?countrycode=${code}`;
    const res = await fetch(url, this.options);
    const found = await res.json();
    if (typeof found !== 'object') {
      throw new CountryNotFoundException(code);
    }
    return found.map((state: any) => State.fromPrimitives({ ...state }));
  }

  async findCitiesByCountryCodeAndStateCode(
    countryCode: string,
    stateCode: string,
  ): Promise<City[]> {
    const url = `${this.baseUrl}/cities-by-countrycode-and-statecode?countrycode=${countryCode}&statecode=${stateCode}`;
    const res = await fetch(url, this.options);
    const found = await res.json();
    return found.map((city: any) => City.fromPrimitives({ ...city }));
  }
}
