import { Inject, Injectable } from '@nestjs/common';
import { ContactRepository } from '../../domain/ContactRepository';
import { ContactNotFoundException } from '../../domain/exceptions/ContactNotFoundException';
import { ContactId } from '../../domain/value-objects/ContactId';

@Injectable()
export class DeleteContact {
  constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
  ) {}

  public async run(id: string, softDelete?: boolean): Promise<void> {
    const found = await this.contactRepository.findById(new ContactId(id));
    if (!found) {
      throw new ContactNotFoundException(id);
    }
    if (softDelete) {
      found.softDelete();
      await this.contactRepository.persist(found);
      return;
    }
    return await this.contactRepository.delete(found.getId());
  }
}
