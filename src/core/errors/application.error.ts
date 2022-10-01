export class ApplicationError extends Error {
  constructor(public readonly message: string, public readonly name = 'ApplicationError') {
    super(message);

    Error.captureStackTrace(this, ApplicationError.captureStackTrace);
  }

  public toString() {
    return `[Error] ${this.name} | ${this.message}`;
  }
}
