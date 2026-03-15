import type {Request} from "express";

export function getClientIp(req: Request) {
  const ip = req.ip || req.headers["x-forwarded-for"]?.toString().split(",")[0] // Si no hay proxy
  if(ip === undefined) {
    return null;
  }
  return ip;
}
