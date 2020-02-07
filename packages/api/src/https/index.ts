import * as express from "express";
import youtubeRouter from "./youtube";

const httpsApp = express();
httpsApp.use("/youtube", youtubeRouter);

export default httpsApp;
