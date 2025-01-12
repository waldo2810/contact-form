import { StringValueObject } from 'src/contexts/shared/domain/value-object/StringValueObject';
import { InvalidArgumentError } from '../exceptions/InvalidArgumentError';

export class ContactEmail extends StringValueObject {
  constructor(email: string) {
    super(email);
    this.ensureIsValid(email);
  }

  private ensureIsValid(value: string): void {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      throw new InvalidArgumentError(`The email ${value} is invalid`);
    }
  }
}
