import { Inject, Injectable } from '@nestjs/common';
import { CityResponse } from 'src/contexts/contact/places/application/CityResponse';
import { CountryResponse } from 'src/contexts/contact/places/application/CountryResponse';
import { FindCityByCountryCodeAndStateCode } from 'src/contexts/contact/places/application/FindCityByCountryCodeAndStateCode';
import { FindCountryByCode } from 'src/contexts/contact/places/application/FindCountryByCode';
import { FindStateByCode } from 'src/contexts/contact/places/application/FindStateByCode';
import { StateResponse } from 'src/contexts/contact/places/application/StateResponse';
import { Contact } from '../../domain/Contact';
import { ContactRepository } from '../../domain/ContactRepository';
import { ContactNotFoundException } from '../../domain/exceptions/ContactNotFoundException';
import { ContactBirthDate } from '../../domain/value-objects/ContactBirthDate';
import { ContactEmail } from '../../domain/value-objects/ContactEmail';
import { ContactFirstName } from '../../domain/value-objects/ContactFirstName';
import { ContactId } from '../../domain/value-objects/ContactId';
import { ContactLastName } from '../../domain/value-objects/ContactLastName';
import { ContactResponse } from '../ContactResponse';
import { ModifyContactDto } from './ModifyContactDto';

@Injectable()
export class ModifyContact {
  constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
    private readonly findCountryUseCase: FindCountryByCode,
    private readonly findStateUseCase: FindStateByCode,
    private readonly findCityUseCase: FindCityByCountryCodeAndStateCode,
  ) {}

  public async run(
    id: string,
    req: ModifyContactDto,
  ): Promise<ContactResponse> {
    const existing = await this.contactRepository.findById(new ContactId(id));
    if (!existing) throw new ContactNotFoundException(id);

    const updatedAddress = req.address
      ? await this.buildAddress(req.address, existing)
      : undefined;

    const modified = existing.modify({
      firstName: req.firstName
        ? new ContactFirstName(req.firstName)
        : undefined,
      lastName: req.lastName ? new ContactLastName(req.lastName) : undefined,
      email: req.email ? new ContactEmail(req.email) : undefined,
      birthDate: req.birthDate
        ? new ContactBirthDate(req.birthDate)
        : undefined,
      line1: updatedAddress?.line1,
      city: updatedAddress?.city,
      state: updatedAddress?.state,
      country: updatedAddress?.country,
      line2: updatedAddress?.line2,
    });

    const saved = await this.contactRepository.persist(modified);
    return new ContactResponse(saved);
  }

  private async buildAddress(
    address: NonNullable<ModifyContactDto['address']>,
    contact: Contact,
  ) {
    let country: CountryResponse = undefined;
    let state: StateResponse = undefined;
    let city: CityResponse = undefined;

    if (address.country) {
      country = await this.findCountryUseCase.run(address.country);
    }

    if (address.state) {
      state = await this.findStateUseCase.run(
        country?.getIsoCode() || contact.getCountry(),
        address.state,
      );
    }

    if (address.city) {
      city = await this.findCityUseCase.run(
        country?.getIsoCode() || contact.getCountry(),
        state?.getIsoCode() || contact.getState(),
        address.city,
      );
    }

    return {
      line1: address.line1 || contact.getLine1(),
      line2: address.line2 !== undefined ? address.line2 : contact.getLine2(),
      city: city?.getName() || contact.getCity(),
      state: state?.getIsoCode() || contact.getState(),
      country: country?.getIsoCode() || contact.getCountry(),
    };
  }
}
