import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import { z } from "zod";

const UserZchema = z.object({
    name: z.string(),
    email: z.email(),
    age: z.number().gt(0).optional()
})

// type User = z.infer<typeof UserZchema>
export default async function main() {
    const user = {
        name: "Daniel Campaz",
        email: "email@email.com"
    }

    const userPasrse = UserZchema.safeParse(user)
    if (userPasrse.success) {
        console.log(userPasrse.data)
    } else {
        console.log(userPasrse.error)
    }
    const PORT = process.env.PORT || 3000;
    const app = express();
    app.set("trust proxy", true);
    app.use(helmet());
    app.use(compression());          // Gzip/Brotli en respuestas
    app.use(cors({
        origin: process.env.ORIGINS || "*",
        credentials: true,// 👈 Necesario si envías cookies cross-origin
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }));
    app.use(cookieParser(process.env.COOKIE_SECRET || "Secret para signed cookies -- cámbialo por algo seguro"));
    app.use(
        urlencoded({
            extended: true,
        })
    );
    app.use(express.json({ limit: "100mb" }));

    app.get("/", (req, res) => {
        res.send("Hello, World!");
    });

    app.listen(PORT, () => {
        console.log("Server is running on port 3000");
    });
}