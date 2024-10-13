import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './_countries/infrastructure/persistence/typeorm/country.entity';
import { CountAllContactsByCity } from './contacts/application/CountAllByCity/CountAllContactsByCity';
import { CreateContact } from './contacts/application/Create/CreateContact';
import { DeleteContact } from './contacts/application/Delete/DeleteContact';
import { FindAllContacts } from './contacts/application/FindAll/FindAllContacts';
import { FindAllContactsByCity } from './contacts/application/FindAllByCity/FindAllContactsByCity';
import { FindContactById } from './contacts/application/FindById/FindContactById';
import { ContactsController } from './contacts/infrastructure/ContactsController';
import { ContactTypeOrmRepository } from './contacts/infrastructure/persistence/ContactTypeOrmRepository';
import { ContactEntity } from './contacts/infrastructure/persistence/typeorm/contact.entity';
import { FindAllCountries } from './places/application/FindAllCountries';
import { FindCityByCountryCodeAndStateCode } from './places/application/FindCityByCountryCodeAndStateCode';
import { FindCountryByCode } from './places/application/FindCountryByCode';
import { FindStateByCode } from './places/application/FindStateByCode';
import { PlacesApiRepository } from './places/infrastructure/PlacesApiRepository';
import { ModifyContact } from './contacts/application/Modify/ModifyContact';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([ContactEntity, CountryEntity]),
  ],
  providers: [
    CreateContact,
    FindContactById,
    FindAllContacts,
    FindAllContactsByCity,
    DeleteContact,
    ModifyContact,
    CountAllContactsByCity,
    FindAllCountries,
    FindCountryByCode,
    FindStateByCode,
    FindCityByCountryCodeAndStateCode,
    { provide: 'ContactRepository', useClass: ContactTypeOrmRepository },
    { provide: 'PlacesRepository', useClass: PlacesApiRepository },
  ],
  controllers: [ContactsController],
})
export class ContactModule {}
