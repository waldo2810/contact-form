import { Country } from '../domain/Country';

export interface PlacesRepository {
  findAllCountries(): Promise<Country[]>;
  findCountryDataByCountryCode(code: string): Promise<Country>;
  findStatesByCountryCode(code: string): Promise<Country>;
  findCitiesByCountryCodeAndStateCode(
    countryCode: string,
    stateCode: string,
  ): Promise<Country>;
}
