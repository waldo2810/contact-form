import { Contact } from './Contact';
import { ContactId } from './value-objects/ContactId';

export interface ContactRepository {
  persist(contact: Contact): Promise<Contact>;
  findById(id: ContactId): Promise<Contact | null>;
  findAll(): Promise<Contact[]>;
  delete(id: ContactId): Promise<void>;
}
