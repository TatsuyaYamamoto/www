import { config } from "firebase-functions";

export interface Config {
  youtube_data_api: { api_key: string };
  cert: {
    games_sokontokoro_factory_net: object;
    dl_code_web_app: object;
  };
  auth0: {
    domain: string;
    identifier: string;
  };
}
export default config() as Config;
