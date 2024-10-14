import { ContactBirthDate } from './value-objects/ContactBirthDate';
import { ContactEmail } from './value-objects/ContactEmail';
import { ContactFirstName } from './value-objects/ContactFirstName';
import { ContactId } from './value-objects/ContactId';
import { ContactLastName } from './value-objects/ContactLastName';
import { ContactSex } from './value-objects/ContactSex';

export class Contact {
  private readonly id: ContactId;
  private firstName: ContactFirstName;
  private lastName: ContactLastName;
  private email: ContactEmail;
  private birthDate: ContactBirthDate;
  private sex: ContactSex;
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
    sex: ContactSex,
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
    this.sex = sex;
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
    sex: ContactSex,
    line1: string,
    city: string,
    state: string,
    country: string,
    line2?: string,
  ): Contact {
    const id = ContactId.generate();
    return new Contact(
      id,
      firstName,
      lastName,
      email,
      birthDate,
      sex,
      line1,
      city,
      state,
      country,
      false,
      line2,
    );
  }

  public modify(fields: ModifyContactFields): Contact {
    if (fields.firstName) this.firstName = fields.firstName;
    if (fields.lastName) this.lastName = fields.lastName;
    if (fields.email) this.email = fields.email;
    if (fields.birthDate) this.birthDate = fields.birthDate;
    if (fields.sex) this.sex = fields.sex;
    if (fields.line1) this.line1 = fields.line1;
    if (fields.city) this.city = fields.city;
    if (fields.state) this.state = fields.state;
    if (fields.country) this.country = fields.country;
    if (fields.line2 !== undefined) this.line2 = fields.line2;

    return this;
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
      sex: this.sex.getValue(),
      line1: this.line1,
      line2: this.line2,
      city: this.city,
      state: this.state,
      country: this.country,
      deleted: this.deleted,
    };
  }

  public static fromPrimitives(primitives: ContactPrimitives) {
    return new Contact(
      new ContactId(primitives.id),
      new ContactFirstName(primitives.firstName),
      new ContactLastName(primitives.lastName),
      new ContactEmail(primitives.email),
      new ContactBirthDate(primitives.birthDate),
      new ContactSex(primitives.sex),
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

  public getSex(): ContactSex {
    return this.sex;
  }
}
