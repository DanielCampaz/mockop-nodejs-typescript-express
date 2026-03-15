import { type Application, BaseEE, GetLogger } from "@core/index";
import { generateUserController, ExpressApplication } from "@modules/index";
import { WinstonLogger } from "@common/index";
import { Config } from "@config/index";

export default async function main() {
  try {
    GetLogger.getInstance().logger = new WinstonLogger()
    const logger = GetLogger.getInstance().logger
    // Add Workers (Examples)
    // const consoleTask = new ConsoleTask()
    // consoleTask.setData("Okay")
    // TaskScheduler.getInstance().addWorker(consoleTask)
    const app: Application = new ExpressApplication({
      logger,
      config: Config.getInstance(),
      corsOptions: {
        origin: "*"
      },
      limitJsonExpress: "100mb"
    })

    await app.import(generateUserController());

    // Start server
    await app.start();
  } catch (e) {
    if(e instanceof BaseEE) {
      console.log("Error Controller, Review pipeline")
      console.error(e);
    } else {
      console.error("Not Controller Error");
      console.error(e);
    }
  }
}
