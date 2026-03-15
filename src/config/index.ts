import "dotenv/config"

import type {Config as IConfig} from "@core/index"

export class Config implements IConfig<any> {
  private static config: Config | null = null;
  private port: number = 3000;

  private constructor() {
    this.port = parseInt(process.env["PORT"] ?? `${this.port}`, 10);
  }

  getPort(): number {
    return this.port
  }

  public static getInstance() {
    if (Config.config === null) {
      Config.config = new Config();
    }
    return Config.config;
  }
}
