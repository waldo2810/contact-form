import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateContact } from './contacts/application/Create/CreateContact';
import { FindContactById } from './contacts/application/FindById/FindContactById';
import { ContactsController } from './contacts/infrastructure/ContactsController';
import { ContactTypeOrmRepository } from './contacts/infrastructure/persistence/ContactTypeOrmRepository';
import { ContactEntity } from './contacts/infrastructure/persistence/typeorm/contact.entity';
import { CountryController } from './countries/infrastructure/CountryController';
import { FindCountryById } from './countries/application/FindById/FindCountryById';
import { FindAllCountries } from './countries/application/FindAll/FindAllCountries';
import { CountryTypeOrmRepository } from './countries/infrastructure/persistence/CountryTypeOrmRepository';
import { CountryEntity } from './countries/infrastructure/persistence/typeorm/country.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'contacts',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([ContactEntity, CountryEntity]),
  ],
  providers: [
    CreateContact,
    FindContactById,
    FindCountryById,
    FindAllCountries,
    { provide: 'ContactRepository', useClass: ContactTypeOrmRepository },
    { provide: 'CountryRepository', useClass: CountryTypeOrmRepository },
  ],
  controllers: [ContactsController, CountryController],
})
export class ContactModule {}
