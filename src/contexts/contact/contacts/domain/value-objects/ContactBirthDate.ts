import { FutureBirthDateException } from '../exceptions/FutureBirthdateException';
import { UserIsMinorError } from '../exceptions/UserIsMinorError';

export class ContactBirthDate {
  private readonly value: Date;

  constructor(value: string) {
    this.value = ContactBirthDate.convertToDate(value);
    if (this.isFuture()) {
      throw new FutureBirthDateException(this.value);
    }
    if (!this.isAdult()) {
      throw new UserIsMinorError();
    }
  }

  public static convertToDate(value: string): Date {
    return new Date(value);
  }

  public getValue(): Date {
    return this.value;
  }

  public isAdult(): boolean {
    const age = new Date().getFullYear() - this.value.getFullYear();
    return age >= 18;
  }

  public isFuture(): boolean {
    return this.value.getTime() > Date.now();
  }
}
