import { Body, Controller, Post } from '@nestjs/common';
import { CreateContact } from '../application/Create/CreateContact';
import { CreateContactDto } from '../application/Create/CreateContactDto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly createContactUseCase: CreateContact) {}

  @Post()
  public async createContact(@Body() req: CreateContactDto) {
    return await this.createContactUseCase.run(req);
  }
}
