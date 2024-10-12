export class CityNotFoundException extends Error {
  constructor(code: string) {
    super(`City with name ${code} not found`);
  }
}
