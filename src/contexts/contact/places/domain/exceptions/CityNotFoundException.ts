export class CityNotFoundException extends Error {
  constructor(code: string) {
    super(`City with code ${code} not found`);
  }
}
