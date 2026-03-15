import type { Router } from "express";
import type { Logger, Config} from "@core/index";
import type {CorsOptions} from "cors";

export interface Controller {
  getPath(): string | null | undefined;
  generateRoutes(): Promise<Router>;
}

export interface OptionsExpressApplication {
  config: Config<any>,
  logger: Logger,
  corsOptions: CorsOptions
  limitJsonExpress: string
}
