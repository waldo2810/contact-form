export class FutureBirthDateException extends Error {
  constructor(birthDate: Date) {
    super(`Birth date <${birthDate.toLocaleDateString()}> is a future date`);
  }
}
