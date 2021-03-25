export class ServerError extends Error {
  constructor(stack: string) {
    super('Inter server error');

    this.name = 'ServerError';
    this.stack = stack;
  }
}
