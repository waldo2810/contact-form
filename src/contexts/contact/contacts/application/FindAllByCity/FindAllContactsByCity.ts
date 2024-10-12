import { Inject, Injectable } from '@nestjs/common';
import { ContactRepository } from '../../domain/ContactRepository';
import { ContactResponse } from '../ContactResponse';

@Injectable()
export class FindAllContactsByCity {
  constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
  ) {}

  public async run(cityName: string): Promise<ContactResponse[]> {
    const found = await this.contactRepository.findAllByCity(cityName);
    return found.map((found) => new ContactResponse(found));
  }
}
