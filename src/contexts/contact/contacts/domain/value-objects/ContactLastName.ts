import { StringValueObject } from 'src/contexts/shared/domain/value-object/StringValueObject';

export class ContactLastName extends StringValueObject {
  constructor(name: string) {
    super(name);
  }
}
