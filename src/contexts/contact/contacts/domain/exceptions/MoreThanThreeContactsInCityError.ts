export class MoreThanThreeContactsInCityError extends Error {
  constructor(cityName: string) {
    super(`There are already three contacts in the city ${cityName}`);
  }
}
