import winston from "winston";
import type {Logger} from "@core/index";

export class WinstonLogger implements Logger {
  private logger: winston.Logger;

  constructor(options?: winston.LoggerOptions) {
    this.logger = winston.createLogger({
      level: "http",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        winston.format.colorize({ all: true }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return stack
            ? `[${timestamp}] ${level}: ${message}\n${stack}`
            : `[${timestamp}] ${level}: ${message}`;
        })
      ),
      transports: [new winston.transports.Console()],
      ...options,
    });
  }

  private format(...data: any[]): string {
    return data
      .map((item) =>
        typeof item === "object" ? JSON.stringify(item, null, 2) : String(item)
      )
      .join(" ");
  }

  log(...data: any[]): void {
    this.logger.info(this.format(...data));
  }

  error(...data: any[]): void {
    this.logger.error(this.format(...data));
  }

  warn(...data: any[]): void {
    this.logger.warn(this.format(...data));
  }

  info(...data: any[]): void {
    this.logger.info(this.format(...data));
  }

  debug(...data: any[]): void {
    this.logger.debug(this.format(...data));
  }

  assert(...data: any[]): void {
    const [condition, ...rest] = data;
    if (!condition) {
      this.logger.error(`Assertion failed: ${this.format(...rest)}`);
    }
  }

  http(...data: any[]): void {
    this.logger.http(this.format(...data));
  }
}
