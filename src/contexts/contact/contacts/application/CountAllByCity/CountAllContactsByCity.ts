import { Inject, Injectable } from '@nestjs/common';
import { ContactRepository } from '../../domain/ContactRepository';

@Injectable()
export class CountAllContactsByCity {
  constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
  ) {}

  public async run(): Promise<Record<string, Record<string, string>>> {
    return await this.contactRepository.countByCity();
  }
}
