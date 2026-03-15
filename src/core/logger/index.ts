import { NoLoggerError } from "../exceptions";

export interface Logger {
  log(...data: any[]): void;
  error(...data: any[]): void;
  warn(...data: any[]): void;
  info(...data: any[]): void;
  debug(...data: any[]): void;
  assert(...data: any[]): void;
  http(...data: any[]): void;
}

export class GetLogger {
  private static instance: GetLogger | null = null;
  private _logger: Logger | null = null;
  private constructor() {  }
  get logger(): Logger {
    if(this._logger === null) throw new NoLoggerError("GetLogger class no registered logger");
    return this._logger;
  }
  set logger(logger: Logger) {
    this._logger = logger;
  }

  public static getInstance(): GetLogger {
    if (!GetLogger.instance) {
      GetLogger.instance = new GetLogger();
    }
    return GetLogger.instance;
  }
}
