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

  public async findAll(): Promise<Contact[]> {
    const found = await this.repository.find();
    return found.map((found) => Contact.fromPrimitives(found));
  }

  public async findById(id: ContactId): Promise<Contact | null> {
    const found = await this.repository.findOne({
      where: { id: id.toString() },
    });
    if (!found) return null;
    return Contact.fromPrimitives(found);
  }

  public async findAllByCity(cityName: string): Promise<Contact[]> {
    const found = await this.repository.find({
      where: { city: cityName },
    });
    return found.map((found) => Contact.fromPrimitives(found));
  }

  public async delete(id: ContactId): Promise<void> {
    await this.repository.delete(id.toString());
  }

  public async countByCity(): Promise<any> {
    return await this.repository
      .createQueryBuilder('contact')
      .select('city')
      .addSelect('COUNT(city)', 'count')
      .groupBy('city')
      .getRawMany();
  }
}
