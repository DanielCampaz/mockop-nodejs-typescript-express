export abstract class BaseEE extends Error {
  constructor(message: string) {
    super(message);
  }
}

export abstract class BaseException extends BaseEE {
  constructor(message: string, cause: string) {
    super(message);
    this.cause = cause;
  }
}

export abstract class BaseError extends BaseEE {
  private readonly _detail: string
  constructor(message: string, detail: string) {
    super(message);
    this._detail = detail
  }

  get detail() {
    return this._detail;
  }
}
