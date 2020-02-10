import { config } from "firebase-functions";
export interface Config {
  youtube_data_api: { api_key: string };
}
export default config() as Config;
