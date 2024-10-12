import { Inject, Injectable } from '@nestjs/common';
import { ContactRepository } from '../../domain/ContactRepository';
import { ContactId } from '../../domain/value-objects/ContactId';
import { ContactResponse } from '../ContactResponse';
import { ContactNotFoundException } from '../../domain/exceptions/ContactNotFoundException';

@Injectable()
export class FindContactById {
  constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
  ) {}

  public async run(id: string): Promise<ContactResponse> {
    const found = await this.contactRepository.findById(new ContactId(id));
    if (!found) {
      throw new ContactNotFoundException(id);
    }
    return new ContactResponse(found);
  }
}
