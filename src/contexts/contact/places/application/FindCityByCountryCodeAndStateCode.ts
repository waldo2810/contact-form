import { Inject } from '@nestjs/common';
import { CityNotFoundException } from '../domain/exceptions/CityNotFoundException';
import { PlacesRepository } from '../domain/PlacesRepository';
import { CityResponse } from './CityResponse';

export class FindCityByCountryCodeAndStateCode {
  constructor(
    @Inject('PlacesRepository')
    private readonly placesRepo: PlacesRepository,
  ) {}

  public async run(
    countryCode: string,
    stateCode: string,
    cityName: string,
  ): Promise<CityResponse> {
    try {
      const cities = await this.placesRepo.findCitiesByCountryCodeAndStateCode(
        countryCode,
        stateCode,
      );
      const city = cities.find((city) => city.getName() === cityName);
      if (!city) {
        throw new CityNotFoundException(cityName, stateCode, countryCode);
      }
      return new CityResponse(city);
    } catch (e) {
      throw e;
    }
  }
}
