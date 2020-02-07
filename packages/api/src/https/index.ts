import * as express from "express";
import * as cors from "cors";

import youtubeRouter from "./youtube";

const httpsApp = express();
httpsApp.use(cors({ origin: true }));
httpsApp.use("/youtube", youtubeRouter);

export default httpsApp;
