import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import youtubeRouter from "./youtube";
import authRouter from "./auth";

const httpsApp = express();
httpsApp.use(cors({ origin: true }));
httpsApp.use(bodyParser.urlencoded({ extended: true }));
httpsApp.use(bodyParser.json());
httpsApp.use("/youtube", youtubeRouter);
httpsApp.use("/auth", authRouter);
httpsApp.use(
  (
    err: Error,
    _: express.Request,
    res: express.Response,
    __: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json(err);
  }
);

export default httpsApp;
