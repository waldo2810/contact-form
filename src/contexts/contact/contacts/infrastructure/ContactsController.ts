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
  Put,
  Query,
} from '@nestjs/common';
import { CityNotFoundException } from '../../places/domain/exceptions/CityNotFoundException';
import { CountryNotFoundException } from '../../places/domain/exceptions/CountryNotFoundException';
import { StateNotFoundException } from '../../places/domain/exceptions/StateNotFoundException';
import { CountAllContactsByCity } from '../application/CountAllByCity/CountAllContactsByCity';
import { CreateContact } from '../application/Create/CreateContact';
import { CreateContactDto } from '../application/Create/CreateContactDto';
import { DeleteContact } from '../application/Delete/DeleteContact';
import { FindAllContacts } from '../application/FindAll/FindAllContacts';
import { FindContactById } from '../application/FindById/FindContactById';
import { ModifyContact } from '../application/Modify/ModifyContact';
import { ModifyContactDto } from '../application/Modify/ModifyContactDto';
import { ContactNotFoundException } from '../domain/exceptions/ContactNotFoundException';
import { FutureBirthDateException } from '../domain/exceptions/FutureBirthdateException';
import { MoreThanThreeContactsInCityError } from '../domain/exceptions/MoreThanThreeContactsInCityError';
import { UserIsMinorError } from '../domain/exceptions/UserIsMinorError';

@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly createContactUseCase: CreateContact,
    private readonly findByIdUseCase: FindContactById,
    private readonly findAllUseCase: FindAllContacts,
    private readonly deleteContactUseCase: DeleteContact,
    private readonly modifyContactUseCase: ModifyContact,
    private readonly countAllByCityUseCase: CountAllContactsByCity,
  ) {}

  @Post()
  public async createContact(@Body() req: CreateContactDto) {
    try {
      return await this.createContactUseCase.run(req);
    } catch (e) {
      if (
        e instanceof FutureBirthDateException ||
        e instanceof UserIsMinorError ||
        e instanceof CountryNotFoundException ||
        e instanceof StateNotFoundException ||
        e instanceof CityNotFoundException ||
        e instanceof MoreThanThreeContactsInCityError
      ) {
        throw new BadRequestException(e.message);
      }
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  public async modifyContact(
    @Param('id') id: string,
    @Body() req: ModifyContactDto,
  ) {
    try {
      return await this.modifyContactUseCase.run(id, req);
    } catch (e) {
      if (
        e instanceof ContactNotFoundException ||
        e instanceof FutureBirthDateException ||
        e instanceof UserIsMinorError ||
        e instanceof CountryNotFoundException ||
        e instanceof StateNotFoundException ||
        e instanceof CityNotFoundException ||
        e instanceof MoreThanThreeContactsInCityError
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

  @Get()
  public async findAllContacts() {
    try {
      return await this.findAllUseCase.run();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  @Get('count-by-city')
  public async countContactsByCity() {
    try {
      return await this.countAllByCityUseCase.run();
    } catch (e) {
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
