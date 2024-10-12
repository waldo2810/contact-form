import { ContactAge } from './value-objects/ContactAge';
import { ContactBirthDate } from './value-objects/ContactBirthDate';
import { ContactEmail } from './value-objects/ContactEmail';
import { ContactFirstName } from './value-objects/ContactFirstName';
import { ContactId } from './value-objects/ContactId';
import { ContactLastName } from './value-objects/ContactLastName';

export class Contact {
  private readonly id: ContactId;
  private readonly firstName: ContactFirstName;
  private readonly lastName: ContactLastName;
  private readonly email: ContactEmail;
  private readonly birthDate: ContactBirthDate;
  private readonly age: ContactAge;
  private readonly line1: string;
  private readonly line2?: string;
  private readonly city: string;
  private readonly state: string;
  private readonly country: string;

  constructor(
    id: ContactId,
    name: ContactFirstName,
    lastName: ContactLastName,
    email: ContactEmail,
    birthDate: ContactBirthDate,
    age: ContactAge,
    line1: string,
    city: string,
    state: string,
    country: string,
    line2?: string,
  ) {
    this.id = id;
    this.firstName = name;
    this.lastName = lastName;
    this.email = email;
    this.birthDate = birthDate;
    this.age = age;
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.state = state;
    this.country = country;
  }

  public static create(
    firstName: ContactFirstName,
    lastName: ContactLastName,
    email: ContactEmail,
    birthDate: ContactBirthDate,
    line1: string,
    city: string,
    state: string,
    country: string,
    line2?: string,
  ): Contact {
    const id = ContactId.generate();
    const age = ContactAge.fromBirthDate(birthDate);
    return new Contact(
      id,
      firstName,
      lastName,
      email,
      birthDate,
      age,
      line1,
      city,
      state,
      country,
      line2,
    );
  }

  public toPrimitives() {
    return {
      id: this.id.toString(),
      firstName: this.firstName.getValue(),
      lastName: this.lastName.getValue(),
      email: this.email.getValue(),
      birthDate: this.birthDate.getValue().toISOString(),
      age: this.age.getValue(),
      line1: this.line1,
      line2: this.line2,
      city: this.city,
      state: this.state,
      country: this.country,
    };
  }

  public static fromPrimitives(primitives: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    age: number;
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
  }) {
    return new Contact(
      new ContactId(primitives.id),
      new ContactFirstName(primitives.firstName),
      new ContactLastName(primitives.lastName),
      new ContactEmail(primitives.email),
      new ContactBirthDate(primitives.birthDate),
      new ContactAge(primitives.age),
      primitives.line1,
      primitives.city,
      primitives.state,
      primitives.country,
      primitives.line2,
    );
  }
}
