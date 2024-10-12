import { Inject } from '@nestjs/common';
import { CountryRepository } from '../../domain/CountryRepository';
import { CountryResponse } from '../CountryResponse';

export class FindAllCountries {
  constructor(
    @Inject('CountryRepository')
    private readonly countryRepository: CountryRepository,
  ) {}

  public async run(): Promise<CountryResponse[]> {
    const found = await this.countryRepository.findAll();
    return found.map((country) => new CountryResponse(country));
  }
}
