export class CityNotFoundException extends Error {
  constructor(code: string, state: string, country: string) {
    super(
      `City with name ${code} not found on state ${state} and country ${country}`,
    );
  }
}
