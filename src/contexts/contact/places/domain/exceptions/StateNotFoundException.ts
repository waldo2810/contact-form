export class StateNotFoundException extends Error {
  constructor(code: string) {
    super(`State with code ${code} not found`);
  }
}
