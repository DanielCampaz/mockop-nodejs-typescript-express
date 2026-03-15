import {BaseError} from "../base.exceptions-error.ts";

export class NoLoggerError extends BaseError {
  constructor(cause: string) {
    super("No Set Logger in configuration, please set logger", cause);
  }
}
