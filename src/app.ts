import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import config from "./config";
import { authRoute } from "./modules/auth/auth.route";
import CookieParser from "cookie-parser";
import { issuesRoute } from "./modules/issues/issues.route";

const app: Application = express();

app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: config.url,
  }),
);

app.use("/api/auth", authRoute);
app.use("/api/issues", issuesRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Yiiiiiiiah! server connected successfully!",
  });
});

export default app;
