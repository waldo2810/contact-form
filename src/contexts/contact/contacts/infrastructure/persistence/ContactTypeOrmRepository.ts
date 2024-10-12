import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../../domain/Contact';
import { ContactRepository } from '../../domain/ContactRepository';
import { ContactId } from '../../domain/value-objects/ContactId';
import { ContactEntity } from './typeorm/contact.entity';

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

  public async findById(id: ContactId): Promise<Contact | null> {
    const found = await this.repository.findOne({
      where: { id: id.toString() },
    });
    if (!found) return null;
    return Contact.fromPrimitives(found);
  }

  public async delete(id: ContactId): Promise<void> {
    await this.repository.delete(id.toString());
  }
}
