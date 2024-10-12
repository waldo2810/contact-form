import { Country } from './Country';

export interface CountryRepository {
  findById(id: string): Promise<Country | null>;
  findAll(): Promise<Country[]>;
}
