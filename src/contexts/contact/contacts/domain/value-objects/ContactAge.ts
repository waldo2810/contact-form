import { NumberValueObject } from 'src/contexts/shared/domain/value-object/NumberValueObject';
import { ContactBirthDate } from './ContactBirthDate';

export class ContactAge extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  public isAdult(): boolean {
    return this.value >= 18;
  }

  public static fromBirthDate(date: ContactBirthDate): ContactAge {
    const birthDate = date.getValue();
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // If the birth date hasn't occurred yet this year, subtract 1 from the age
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return new ContactAge(age);
  }
}
