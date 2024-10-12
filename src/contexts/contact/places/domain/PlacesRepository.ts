import { Country } from '../domain/Country';
import { City } from './City';
import { State } from './State';

export interface PlacesRepository {
  findAllCountries(): Promise<Country[]>;
  findCountryDataByCountryCode(code: string): Promise<Country>;
  findStatesByCountryCode(code: string): Promise<State[]>;
  findCitiesByCountryCodeAndStateCode(
    countryCode: string,
    stateCode: string,
  ): Promise<City[]>;
}
