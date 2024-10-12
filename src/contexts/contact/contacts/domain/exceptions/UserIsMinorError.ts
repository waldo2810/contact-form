export class UserIsMinorError extends Error {
  constructor() {
    super(`Users must be adults to create a contact`);
  }
}
