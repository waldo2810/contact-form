import { v4 as uuidv4 } from 'uuid';

export class ContactId {
  private readonly value: string;

  constructor(id: string) {
    this.value = id;
  }

  public static generate(): ContactId {
    return new ContactId(uuidv4());
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: ContactId): boolean {
    return other.toString() === this.value;
  }
}
