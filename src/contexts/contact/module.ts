import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsController } from './contacts/infrastructure/ContactsController';
import { ContactEntity } from './contacts/infrastructure/persistence/typeorm/contact.entity';
import { CreateContact } from './contacts/application/Create/CreateContact';
import { ContactTypeOrmRepository } from './contacts/infrastructure/persistence/ContactTypeOrmRepository';
import { FindContactById } from './contacts/application/FindById/FindContactById';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
  controllers: [ContactsController],
  providers: [
    CreateContact,
    FindContactById,
    { provide: 'ContactRepository', useClass: ContactTypeOrmRepository },
  ],
})
export class ContactModule {}
