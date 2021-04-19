export class AcessDeniedError extends Error {
  constructor() {
    super('Acess denied');
    this.name = 'AcessDeniedError';
  }
}
