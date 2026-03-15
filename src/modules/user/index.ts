export * from "./user.controller.ts"

import {type Request, type Response, Router} from "express";
import {generateExpressController} from "../app";
import {UserController} from "./user.controller.ts"

const userController = new UserController();
const userRouter = Router()

userRouter.get("/", (_req: Request, res: Response) => {
  const response = userController.getUsers();
  return res.status(200).json({response})
})

export const generateUserController = () => generateExpressController(userRouter, "/user")
