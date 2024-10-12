import { Inject } from '@nestjs/common';
import { PlacesRepository } from '../domain/PlacesRepository';
import { CountryResponse } from './CountryResponse';

export class FindAllCountries {
  constructor(
    @Inject('PlacesRepository')
    private readonly placesRepo: PlacesRepository,
  ) {}

  public async run(): Promise<CountryResponse[]> {
    const found = await this.placesRepo.findAllCountries();
    return found.map((country) => new CountryResponse(country));
  }
}
