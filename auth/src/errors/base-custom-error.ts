export default abstract class BaseCustomError extends Error {
  protected abstract statusCode: number;

  protected abstract defaultErrorMessage: string;

  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }

  abstract getStatusCode(): number;
  abstract serializeErrorOutput(): unknown;
}
