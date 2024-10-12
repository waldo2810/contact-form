import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'countries' })
export class CountryEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;
}
