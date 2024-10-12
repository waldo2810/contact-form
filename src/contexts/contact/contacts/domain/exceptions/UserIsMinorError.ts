export class UserIsMinorError extends Error {
  constructor(id: string) {
    super(`User <${id}> is a minor`);
  }
}
