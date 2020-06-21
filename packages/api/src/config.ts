import { config } from "firebase-functions";
import { Scope } from "./service/firebase";

export interface Config {
  youtube_data_api: { api_key: string };
  cert: {
    games_sokontokoro_factory_net: object;
    dl_code_web_app: object;
  };
  auth0: {
    domain: string;
    clientId: {
      default: string;
      games_sokontokoro_factory_net: string;
      dl_code_web_app: string;
    };
  };
}

const _config = config() as Config;

export const getClientIdBy = (scope: Scope): string => {
  if (scope === "default") {
    return _config.auth0.clientId.default;
  }

  if (scope === "games.sokontokoro-factory.net") {
    return _config.auth0.clientId.games_sokontokoro_factory_net;
  }

  if (scope === "dl-code.web.app") {
    return _config.auth0.clientId.dl_code_web_app;
  }

  throw new Error("unreachable.");
};

export default _config;
