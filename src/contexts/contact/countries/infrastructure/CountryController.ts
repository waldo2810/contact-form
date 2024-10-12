import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { FindAllCountries } from '../application/FindAll/FindAllCountries';
import { FindCountryById } from '../application/FindById/FindCountryById';
import { CountryNotFoundException } from '../domain/exceptions/CountryNotFoundException';

@Controller('countries')
export class CountryController {
  constructor(
    private readonly findByIdUseCase: FindCountryById,
    private readonly findAllUseCase: FindAllCountries,
  ) {}

  @Get()
  public async findAllCountries() {
    try {
      return await this.findAllUseCase.run();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  public async findCountryById(@Param('id') id: string) {
    try {
      return await this.findByIdUseCase.run(id);
    } catch (e) {
      if (e instanceof CountryNotFoundException) {
        throw new NotFoundException(e.message);
      }
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
