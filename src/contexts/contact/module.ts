import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsController } from './contacts/infrastructure/ContactsController';
import { ContactEntity } from './contacts/infrastructure/persistence/typeorm/contact.entity';
import { CreateContact } from './contacts/application/Create/CreateContact';
import { ContactTypeOrmRepository } from './contacts/infrastructure/persistence/ContactTypeOrmRepository';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
  controllers: [ContactsController],
  providers: [
    CreateContact,
    { provide: 'ContactRepository', useClass: ContactTypeOrmRepository },
  ],
})
export class ContactModule {}
