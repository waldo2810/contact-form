import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../../domain/Country';
import { CountryRepository } from '../../domain/CountryRepository';
import { CountryEntity } from './typeorm/country.entity';

@Injectable()
export class CountryTypeOrmRepository implements CountryRepository {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly repository: Repository<CountryEntity>,
  ) {}

  public async findAll(): Promise<Country[]> {
    const found = await this.repository.find();
    return found.map((country) => Country.fromPrimitives(country));
  }

  public async findById(id: string): Promise<Country | null> {
    const found = await this.repository.findOne({
      where: { id: id.toString() },
    });
    if (!found) return null;
    return Country.fromPrimitives(found);
  }
}
