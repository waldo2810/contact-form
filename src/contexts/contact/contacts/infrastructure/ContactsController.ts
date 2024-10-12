import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CityNotFoundException } from '../../places/domain/exceptions/CityNotFoundException';
import { CountryNotFoundException } from '../../places/domain/exceptions/CountryNotFoundException';
import { StateNotFoundException } from '../../places/domain/exceptions/StateNotFoundException';
import { CreateContact } from '../application/Create/CreateContact';
import { CreateContactDto } from '../application/Create/CreateContactDto';
import { DeleteContact } from '../application/Delete/DeleteContact';
import { FindContactById } from '../application/FindById/FindContactById';
import { ContactNotFoundException } from '../domain/exceptions/ContactNotFoundException';
import { UserIsMinorError } from '../domain/exceptions/UserIsMinorError';

@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly createContactUseCase: CreateContact,
    private readonly findByIdUseCase: FindContactById,
    private readonly deleteContactUseCase: DeleteContact,
  ) {}

  @Post()
  public async createContact(@Body() req: CreateContactDto) {
    try {
      return await this.createContactUseCase.run(req);
    } catch (e) {
      if (
        e instanceof UserIsMinorError ||
        e instanceof CountryNotFoundException ||
        e instanceof StateNotFoundException ||
        e instanceof CityNotFoundException
      ) {
        throw new BadRequestException(e.message);
      }
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  public async deleteContact(
    @Param('id') id: string,
    @Query('soft') soft: boolean,
  ) {
    try {
      return await this.deleteContactUseCase.run(id, soft);
    } catch (e) {
      if (e instanceof ContactNotFoundException) {
        throw new BadRequestException(e.message);
      }
      console.log(e);
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
