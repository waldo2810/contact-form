import { UserIsMinorError } from './exceptions/UserIsMinorError';
import { ContactAge } from './value-objects/ContactAge';
import { ContactBirthDate } from './value-objects/ContactBirthDate';
import { ContactEmail } from './value-objects/ContactEmail';
import { ContactFirstName } from './value-objects/ContactFirstName';
import { ContactId } from './value-objects/ContactId';
import { ContactLastName } from './value-objects/ContactLastName';

export class Contact {
  private readonly id: ContactId;
  private firstName: ContactFirstName;
  private lastName: ContactLastName;
  private email: ContactEmail;
  private birthDate: ContactBirthDate;
  private age: ContactAge;
  private line1: string;
  private line2?: string;
  private city: string;
  private state: string;
  private country: string;
  private deleted: boolean;

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
    deleted: boolean,
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
    this.deleted = deleted;
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
    if (!age.isAdult()) {
      throw new UserIsMinorError(id.toString());
    }
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
      false,
      line2,
    );
  }

  public softDelete() {
    this.deleted = true;
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
      deleted: this.deleted,
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
    city: string;
    state: string;
    country: string;
    line2?: string;
    deleted: boolean;
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
      primitives.deleted,
      primitives.line2,
    );
  }

  public getId(): ContactId {
    return this.id;
  }

  public getFirstName(): ContactFirstName {
    return this.firstName;
  }

  public getLastName(): ContactLastName {
    return this.lastName;
  }

  public getEmail(): ContactEmail {
    return this.email;
  }

  public getBirthDate(): ContactBirthDate {
    return this.birthDate;
  }

  public getAge(): ContactAge {
    return this.age;
  }

  public getLine1(): string {
    return this.line1;
  }

  public getLine2(): string | undefined {
    return this.line2;
  }

  public getCity(): string {
    return this.city;
  }

  public getState(): string {
    return this.state;
  }

  public getCountry(): string {
    return this.country;
  }
}
