export abstract class StringValueObject {
  protected readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}
