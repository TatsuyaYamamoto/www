import { initializeApp, credential } from "firebase-admin";

import config from "../config";

export const apps = {
  // www.sokontokoro-factory.net
  // api.sokontokoro-factory.net
  // accounts.sokontokoro-factory.net
  default: initializeApp(
    {
      credential: credential.applicationDefault()
    },
    undefined /* default */
  ),
  "games.sokontokoro-factory.net": initializeApp(
    {
      credential: credential.cert(config.cert.games_sokontokoro_factory_net)
    },
    "games.sokontokoro-factory.net"
  ),
  "dl-code.web.app": initializeApp(
    {
      credential: credential.cert(config.cert.dl_code_web_app)
    },
    "dl-code.web.app"
  )
} as const;

export type Scope = keyof typeof apps;

/**
 * Type Guard Function for {@link Scope}
 *
 * @param arg
 */
export const isScope = (arg: any): arg is Scope => {
  if (typeof arg !== "string") {
    return false;
  }

  return Object.keys(apps).includes(arg);
};
