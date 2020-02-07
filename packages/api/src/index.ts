import { https } from "firebase-functions";
import _httpsApp from "./https";

export const httpsApp = https.onRequest(_httpsApp);
