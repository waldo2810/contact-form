import { Contact } from '../domain/Contact';

export class ContactResponse {
  private readonly id: string;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly email: string;
  private readonly birthDate: string;
  private readonly age: number;
  private readonly address: object;

  constructor(contact: Contact) {
    const primitive = contact.toPrimitives();
    this.id = primitive.id;
    this.firstName = primitive.firstName;
    this.lastName = primitive.lastName;
    this.email = primitive.email;
    this.birthDate = primitive.birthDate;
    this.age = primitive.age;
    this.address = {
      line1: primitive.line1,
      line2: primitive.line2,
      city: primitive.city,
      state: primitive.state,
      country: primitive.country,
    };
  }
}
