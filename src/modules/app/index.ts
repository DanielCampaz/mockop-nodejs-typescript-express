import type {Controller} from "./express.interfaces.ts";
import {type Router} from "express";

export * from "./express.application.ts"
export * from "./express.interfaces.ts"

export function generateExpressController(router : Router, path?: string): Controller {
  const expressController: Controller = {
    generateRoutes: async () => {
      return router
    },
    getPath: () => {
      return path
    }
  }
  return expressController;
}
