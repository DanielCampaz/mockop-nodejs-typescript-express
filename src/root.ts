import main from "./main.ts";
import {GetLogger} from "@core/index";

async function root(): Promise<void> {
  await main();
}


root().then(() => {
  try {
    const logger = GetLogger.getInstance().logger
    logger.log("Application Run Successful")
  } catch (e) {
    console.log("Application Run Successful")
  }
}).catch((error) => {
  try {
    const logger = GetLogger.getInstance().logger
    logger.error("Application Run Failed")
    logger.error(error);
  } catch (e) {
    console.error("Application Run Failed")
    console.error(error);
  }
});
