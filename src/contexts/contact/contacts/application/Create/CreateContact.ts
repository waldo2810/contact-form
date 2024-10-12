import { Inject, Injectable } from '@nestjs/common';
import { FindCityByCountryCodeAndStateCode } from 'src/contexts/contact/places/application/FindCityByCountryCodeAndStateCode';
import { FindCountryByCode } from 'src/contexts/contact/places/application/FindCountryByCode';
import { FindStateByCode } from 'src/contexts/contact/places/application/FindStateByCode';
import { Contact } from '../../domain/Contact';
import { ContactRepository } from '../../domain/ContactRepository';
import { MoreThanThreeContactsInCityError } from '../../domain/exceptions/MoreThanThreeContactsInCityError';
import { ContactBirthDate } from '../../domain/value-objects/ContactBirthDate';
import { ContactEmail } from '../../domain/value-objects/ContactEmail';
import { ContactFirstName } from '../../domain/value-objects/ContactFirstName';
import { ContactLastName } from '../../domain/value-objects/ContactLastName';
import { ContactResponse } from '../ContactResponse';
import { FindAllContactsByCity } from '../FindAllByCity/FindAllContactsByCity';
import { CreateContactDto } from './CreateContactDto';

@Injectable()
export class CreateContact {
  constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
    private readonly findByCityUseCase: FindAllContactsByCity,
    private readonly findCountryUseCase: FindCountryByCode,
    private readonly findStateUseCase: FindStateByCode,
    private readonly findCityUseCase: FindCityByCountryCodeAndStateCode,
  ) {}

  public async run(req: CreateContactDto): Promise<ContactResponse> {
    const validAddress = await this.buildAddress(req.address);
    const contact = Contact.create(
      new ContactFirstName(req.firstName),
      new ContactLastName(req.lastName),
      new ContactEmail(req.email),
      new ContactBirthDate(req.birthDate),
      validAddress.line1,
      validAddress.city,
      validAddress.state,
      validAddress.country,
      validAddress.line2,
    );
    const saved = await this.contactRepository.persist(contact);
    return new ContactResponse(saved);
  }

  private async buildAddress(address: CreateContactDto['address']) {
    const country = await this.findCountryUseCase.run(address.country);
    const state = await this.findStateUseCase.run(
      country.getIsoCode(),
      address.state,
    );
    const city = await this.findCityUseCase.run(
      country.getIsoCode(),
      state.getIsoCode(),
      address.city,
    );
    await this.validateNumberOfContacts(city.getName());
    return {
      line1: address.line1,
      line2: address.line2,
      city: city.getName(),
      state: state.getIsoCode(),
      country: country.getIsoCode(),
    };
  }

  private async validateNumberOfContacts(cityName: string) {
    const existingForCity = await this.findByCityUseCase.run(cityName);
    if (existingForCity.length >= 3) {
      throw new MoreThanThreeContactsInCityError(cityName);
    }
  }
}
