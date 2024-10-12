import { Repository } from 'typeorm';
import { ContactRepository } from '../../domain/ContactRepository';
import { ContactEntity } from './typeorm/contact.entity';
import { Contact } from '../../domain/Contact';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactTypeOrmRepository implements ContactRepository {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly repository: Repository<ContactEntity>,
  ) {}

  public async persist(contact: Contact): Promise<Contact> {
    const primitive = contact.toPrimitives();
    const saved = await this.repository.save(primitive);
    const domain = Contact.fromPrimitives(saved);
    return domain;
  }
}
