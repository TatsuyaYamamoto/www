import * as express from "express";

const youtubeRouter = express.Router();
youtubeRouter.get("/", (req, res) => {
  res.json({ message: "youtube resource" });
});

youtubeRouter.get("/comments", (req, res) => {
  res.json([
    { message: "youtube.ts resource" },
    { message: "youtube.ts resource" }
  ]);
});

export default youtubeRouter;
