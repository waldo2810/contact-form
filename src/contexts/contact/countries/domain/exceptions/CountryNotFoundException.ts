export class CountryNotFoundException extends Error {
  constructor(id: string) {
    super(`Country <${id}> wasn't found'`);
  }
}
