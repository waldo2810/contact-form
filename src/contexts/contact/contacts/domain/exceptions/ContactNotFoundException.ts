export class ContactNotFoundException extends Error {
  constructor(id: string) {
    super(`Contact <${id}> wasn't found'`);
  }
}
