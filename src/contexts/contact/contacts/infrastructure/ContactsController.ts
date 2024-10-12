import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateContact } from '../application/Create/CreateContact';
import { CreateContactDto } from '../application/Create/CreateContactDto';
import { FindContactById } from '../application/FindById/FindContactById';
import { ContactNotFoundException } from '../domain/exceptions/ContactNotFoundException';
import { UserIsMinorError } from '../domain/exceptions/UserIsMinorError';

@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly createContactUseCase: CreateContact,
    private readonly findByIdUseCase: FindContactById,
  ) {}

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

  @Get(':id')
  public async findContactById(@Param('id') id: string) {
    try {
      return await this.findByIdUseCase.run(id);
    } catch (e) {
      if (e instanceof ContactNotFoundException) {
        throw new NotFoundException(e.message);
      }
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
