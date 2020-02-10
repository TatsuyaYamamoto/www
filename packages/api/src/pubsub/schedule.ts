import { pubsub } from "firebase-functions";
import { cacheCommentResources } from "../service/youtube";

export const cacheYoutubeComments = pubsub
  // 毎日 0:30
  .schedule("30 0 * * *")
  .timeZone("Asia/Tokyo")
  .onRun(async context => {
    const result = await cacheCommentResources();
    console.log({
      youtubeCommentThreads: {
        size: result.youtubeCommentThreads.length
      },
      youtubeComments: {
        size: result.youtubeComments.length
      }
    });
  });
