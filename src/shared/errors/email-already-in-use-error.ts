export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('email is already in use');
    this.name = 'EmailAlreadyInUseError';
  }
}
