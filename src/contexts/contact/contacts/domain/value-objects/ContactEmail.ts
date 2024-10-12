import { StringValueObject } from 'src/contexts/shared/domain/value-object/StringValueObject';

export class ContactEmail extends StringValueObject {
  constructor(email: string) {
    super(email);
  }
}
