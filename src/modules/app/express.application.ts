import express, {
  type Application as ExpApplication,
  type NextFunction,
  type Request,
  type Response,
  urlencoded
} from "express";
import cors, {type CorsOptions} from "cors";
import type {Application, Config, Logger} from "@core/index";
import type {Controller, OptionsExpressApplication} from "./express.interfaces.ts";
import {Security} from "@middlewares/index";
import {TaskScheduler} from "@core/task-scheduling";

export class ExpressApplication implements Application<Controller> {
  private app: ExpApplication
  private readonly options: OptionsExpressApplication
  private corsOptions: CorsOptions
  private config: Config<any>
  private logger: Logger
  constructor(options: OptionsExpressApplication) {
    (BigInt.prototype as any).toJSON = function () {
      return this.toString();
    };
    this.app = express();
    this.app.set("trust proxy", true);
    this.options = options;
    this.config = options.config;
    this.logger = options.logger;
    this.corsOptions = options.corsOptions;
  }

  async import(controller: Controller): Promise<void> {
    const path = controller.getPath();
    const routes = await controller.generateRoutes()
    if(path === undefined || path === null || path === "" || path === "/") {
      this.app.use(routes);
      this.logger.log("Import routes")
    } else {
      this.app.use(path, routes)
      this.logger.log("Import route "+path);
    }
  }

  private async activeMiddlewares(): Promise<void> {
    this.app.use(cors(this.corsOptions));
    this.app.use(
      urlencoded({
        extended: true,
      })
    );
    this.app.use(express.json({ limit: this.options.limitJsonExpress }));
    new Security().setSecurityExpress(this.app);

    // Finish Middleware
    this.app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      this.logger.error("Error while importing express route", err);
      // 🚨 Evita enviar respuesta doble
      if (res.headersSent) {
        return;
      }
      return res
        .status(500)
        .json({error: err})
    })
  }

  async start(): Promise<void> {
    await this.activeMiddlewares()

    //Init Cron
    TaskScheduler.getInstance().initDefaultTasks()
    //                                               For production
    this.app.listen(this.config.getPort(), "0.0.0.0", () => {
      this.logger.log("Application started on " + `http://localhost:${this.config.getPort()}/`);
    })
  }
}
