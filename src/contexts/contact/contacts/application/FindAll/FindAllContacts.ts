import { Inject, Injectable } from '@nestjs/common';
import { ContactRepository } from '../../domain/ContactRepository';
import { ContactResponse } from '../ContactResponse';

@Injectable()
export class FindAllContacts {
  constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
  ) {}

  public async run(): Promise<ContactResponse[]> {
    const found = await this.contactRepository.findAll();
    return found.map((found) => new ContactResponse(found));
  }
}
