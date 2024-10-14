import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'contacts' })
export class ContactEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  birthDate: string;

  @Column()
  sex: string;

  @Column()
  line1: string;

  @Column({ nullable: true })
  line2?: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({ default: false })
  deleted: boolean;
}
