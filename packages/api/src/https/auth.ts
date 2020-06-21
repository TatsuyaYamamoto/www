import * as express from "express";
import * as jwt from "express-jwt";
import * as jwks from "jwks-rsa";

import config, { getClientIdBy } from "../config";
import { apps, isScope } from "../service/firebase";

const authRouter = express.Router();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.auth0.domain}/.well-known/jwks.json`
  }),
  issuer: `https://${config.auth0.domain}/`,
  algorithm: "RS256"
  // audの検証は、handler function内で行う
  // audience: "",
});

authRouter.post("/token", jwtCheck, (req, res, next) => {
  // @ts-ignore express-jwtから型が提供されていない
  const { sub: uid, aud: audience } = req.user;
  if (!uid) {
    res
      .status(500)
      .json({ message: `unexpected. decoded jwt' format is non-supported.` });
    return;
  }

  const scope = req.body.scope;
  if (!isScope(scope)) {
    res.status(400).json({ message: `you should provide scope as param` });
    return;
  }

  if (getClientIdBy(scope) !== audience) {
    res
      .status(400)
      .json({ message: `provided scope is different from aud in JWT.` });
    return;
  }

  (async () => {
    const token = await apps[scope].auth().createCustomToken(uid);

    res.json({
      uid,
      domain: config.auth0.domain,
      token
    });
  })().catch(next);
});

export default authRouter;
