import { Inject, Injectable } from '@nestjs/common';
import { CreateContactDto } from './CreateContactDto';
import { Contact } from '../../domain/Contact';
import { ContactResponse } from '../ContactResponse';
import { ContactFirstName } from '../../domain/value-objects/ContactFirstName';
import { ContactLastName } from '../../domain/value-objects/ContactLastName';
import { ContactEmail } from '../../domain/value-objects/ContactEmail';
import { ContactBirthDate } from '../../domain/value-objects/ContactBirthDate';
import { ContactRepository } from '../../domain/ContactRepository';

@Injectable()
export class CreateContact {
  constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
  ) {}

  public async run(req: CreateContactDto): Promise<ContactResponse> {
    const contact = Contact.create(
      new ContactFirstName(req.firstName),
      new ContactLastName(req.lastName),
      new ContactEmail(req.email),
      new ContactBirthDate(req.birthDate),
      req.address.line1,
      req.address.city,
      req.address.state,
      req.address.country,
      req.address.line2,
    );
    const saved = await this.contactRepository.persist(contact);
    return new ContactResponse(saved);
  }
}
