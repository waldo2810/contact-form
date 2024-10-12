import { Inject } from '@nestjs/common';
import { PlacesRepository } from '../domain/PlacesRepository';
import { CountryResponse } from './CountryResponse';
import { CountryNotFoundException } from '../../_countries/domain/exceptions/CountryNotFoundException';

export class FindCountryByCode {
  constructor(
    @Inject('PlacesRepository')
    private readonly placesRepo: PlacesRepository,
  ) {}

  public async run(code: string): Promise<CountryResponse> {
    try {
      const found = await this.placesRepo.findCountryDataByCountryCode(code);
      if (!found) {
        throw new CountryNotFoundException(code);
      }
      return new CountryResponse(found);
    } catch (e) {
      throw e;
    }
  }
}
