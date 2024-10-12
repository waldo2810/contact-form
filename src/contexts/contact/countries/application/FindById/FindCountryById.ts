import { Inject, Injectable } from '@nestjs/common';
import { CountryRepository } from '../../domain/CountryRepository';
import { CountryNotFoundException } from '../../domain/exceptions/CountryNotFoundException';
import { CountryResponse } from '../CountryResponse';

@Injectable()
export class FindCountryById {
  constructor(
    @Inject('CountryRepository')
    private readonly countryRepository: CountryRepository,
  ) {}

  public async run(id: string): Promise<CountryResponse> {
    const found = await this.countryRepository.findById(id);
    if (!found) {
      throw new CountryNotFoundException(id);
    }
    return new CountryResponse(found);
  }
}
