import * as express from "express";

import {
  cacheCommentResources,
  getCommentsRepliedByChannel
} from "../service/youtube";

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

youtubeRouter.get("/comments", (req, res, next) => {
  const { videoId } = req.query;

  if (!videoId) {
    res.status(400).json({ message: `no video id is provided.` });
    return;
  }

  (async () => {
    const result = await getCommentsRepliedByChannel(videoId);

    res.json(result);
  })().catch(next);
});

export default youtubeRouter;
