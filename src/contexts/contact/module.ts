import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateContact } from './contacts/application/Create/CreateContact';
import { FindContactById } from './contacts/application/FindById/FindContactById';
import { ContactsController } from './contacts/infrastructure/ContactsController';
import { ContactTypeOrmRepository } from './contacts/infrastructure/persistence/ContactTypeOrmRepository';
import { ContactEntity } from './contacts/infrastructure/persistence/typeorm/contact.entity';

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
    TypeOrmModule.forFeature([ContactEntity]),
  ],
  providers: [
    CreateContact,
    FindContactById,
    { provide: 'ContactRepository', useClass: ContactTypeOrmRepository },
  ],
  controllers: [ContactsController],
})
export class ContactModule {}
