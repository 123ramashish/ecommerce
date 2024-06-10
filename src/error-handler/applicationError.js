export class applocationError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
