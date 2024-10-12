export class ContactBirthDate {
  private readonly value: Date;

  constructor(value: string) {
    this.value = ContactBirthDate.convertToDate(value);
  }

  public static convertToDate(value: string): Date {
    return new Date(value);
  }

  public getValue(): Date {
    return this.value;
  }
}
