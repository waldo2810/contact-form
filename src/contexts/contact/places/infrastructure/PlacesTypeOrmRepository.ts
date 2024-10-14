import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../domain/City';
import { Country } from '../domain/Country';
import { PlacesRepository } from '../domain/PlacesRepository';
import { State } from '../domain/State';
import { CountryEntity } from './typeorm/country.entity';
import { StateEntity } from './typeorm/state.entity';

@Injectable()
export class PlacesTypeOrmRepository implements PlacesRepository {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  public async findAllCountries(): Promise<Country[]> {
    const found = await this.countryRepository.find();
    return found.map((country) => Country.fromPrimitives(country));
  }

  public async findCountryDataByCountryCode(code: string): Promise<Country> {
    const found = await this.countryRepository.findOne({
      where: { isoCode: code },
    });
    if (!found) return null;
    return Country.fromPrimitives(found);
  }

  public async findStatesByCountryCode(code: string): Promise<State[]> {
    const found = await this.stateRepository.find({
      where: { countryCode: code.toLowerCase() },
    });
    if (!found) return null;
    return found.map((state) => State.fromPrimitives(state));
  }

  public async findCitiesByCountryCodeAndStateCode(
    countryCode: string,
    stateCode: string,
  ): Promise<City[]> {
    throw new Error('Method not implemented.');
  }
}
