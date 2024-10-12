import { Contact } from './Contact';

export interface ContactRepository {
  persist(contact: Contact): Promise<Contact>;
}
