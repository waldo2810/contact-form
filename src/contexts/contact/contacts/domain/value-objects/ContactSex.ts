import { StringValueObject } from 'src/contexts/shared/domain/value-object/StringValueObject';
import { InvalidArgumentError } from '../exceptions/InvalidArgumentError';

export class ContactSex extends StringValueObject {
  constructor(name: string) {
    super(name);
    this.ensureIsValid(name);
  }

  private ensureIsValid(value: string): void {
    const regex = /^(male|female)$/;
    if (!regex.test(value)) {
      throw new InvalidArgumentError(`Sex ${value} is invalid`);
    }
  }
}
