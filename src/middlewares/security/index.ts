import {type Application} from "express";
import rateLimit from "express-rate-limit"
import helmet from "helmet";
import {getClientIp} from "@common/index";
import {GetLogger, type Logger, HttpStatusMap} from "@core/index";

export class Security {
  private logger: Logger;
  constructor() {
    this.logger = GetLogger.getInstance().logger
  }

  setSecurityExpress(app: Application) {
    const loginLimiter = rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutos
      max: 100,// maximo 100 peticiones por ip cada 10 minutos
      handler: (req, res) => {
        const ip = getClientIp(req); // 👈 IP del cliente

        if(ip !== null) this.logger.log(`IP bloqueada: ${ip}`);
        // Aquí la guardas en tu DB, archivo, lo que necesites

        res.status(HttpStatusMap.tooManyRequestsRequest).json({
          error: "You have exceeded the request limit.",
         // ip, // opcional, si quieres devolverla en la respuesta
        });
      },
    });
    app.use(helmet())
    app.use(loginLimiter)
  }
}
