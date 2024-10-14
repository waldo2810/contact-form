import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CountryEntity } from './country.entity';
import { StateEntity } from './state.entity';

@Entity({ name: 'cities' })
export class CityEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  isoCode: string;

  @ManyToOne(() => StateEntity, (state) => state.id)
  state: string;

  @ManyToOne(() => CountryEntity, (country) => country.id)
  country: string;
}
