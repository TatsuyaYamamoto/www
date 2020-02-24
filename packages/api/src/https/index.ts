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

export default httpsApp;
