import { Contact } from './Contact';

export interface ContactRepository {
  save(contact: Contact): Promise<Contact>;
}
