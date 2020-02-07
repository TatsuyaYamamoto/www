import * as express from "express";

import { cacheCommentResources } from "../service/youtube";

const youtubeRouter = express.Router();

youtubeRouter.post("/comments/cache", (req, res, next) => {
  (async () => {
    const result = await cacheCommentResources();

    res.json({
      youtubeCommentThreads: {
        size: result.youtubeCommentThreads.length
      },
      youtubeComments: {
        size: result.youtubeComments.length
      }
    });
  })().catch(next);
});

youtubeRouter.get("/comments", (req, res) => {
  res.json([
    { message: "youtube.ts resource" },
    { message: "youtube.ts resource" }
  ]);
});

export default youtubeRouter;
