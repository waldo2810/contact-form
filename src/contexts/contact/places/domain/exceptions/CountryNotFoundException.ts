export class CountryNotFoundException extends Error {
  constructor(code: string) {
    super(`Country with code ${code} not found`);
  }
}
