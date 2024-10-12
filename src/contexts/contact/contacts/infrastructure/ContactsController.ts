import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateContact } from '../application/Create/CreateContact';
import { CreateContactDto } from '../application/Create/CreateContactDto';
import { UserIsMinorError } from '../domain/exceptions/UserIsMinorError';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly createContactUseCase: CreateContact) {}

  @Post()
  public async createContact(@Body() req: CreateContactDto) {
    try {
      return await this.createContactUseCase.run(req);
    } catch (e) {
      if (e instanceof UserIsMinorError) {
        throw new BadRequestException(e.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
