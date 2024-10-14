import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CountryEntity } from './country.entity';

@Entity({ name: 'states' })
export class StateEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  isoCode: string;

  @Column()
  countryCode: string;

  @ManyToOne(() => CountryEntity, (country) => country.id)
  country: string;
}
