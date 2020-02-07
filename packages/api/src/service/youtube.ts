import { google } from "googleapis";

import { firestore } from "./firebase";
import config from "../config";

// const CHANNEL_ID = "UCf-Z2GqqJs6-Sy7rpy0GHsg";

const youtubeClient = google.youtube({
  version: "v3",
  auth: config.youtube_data_api.api_key
});

function notUndefined<T>(item: T | undefined): item is T {
  return item !== undefined;
}

// TODO: performance tuning!
export const cacheCommentResources = async () => {
  const targetVideoIds = [
    // (T28＾ω＾つ静岡県道17号沼津土肥線上のシンデレラ【G線上のシンデレラ / Arrange / MV】
    "g8qJsZ8Lbx4"
  ];

  // TODO: load threads recursively
  const youtubeCommentThreads = (
    await Promise.all(
      targetVideoIds.map(videoId => {
        return youtubeClient.commentThreads.list({
          part: "snippet",
          videoId: videoId,
          maxResults: 30
        });
      })
    )
  )
    .map(result => {
      return result.data.items;
    })
    .filter(notUndefined)
    // flatten
    .reduce((acc, value) => acc.concat(value), []);

  const youtubeComments = (
    await Promise.all(
      youtubeCommentThreads.map(youtubeCommentThread => {
        const parentCommentId =
          youtubeCommentThread.snippet?.topLevelComment?.id;

        if (!parentCommentId) {
          return;
        }

        return youtubeClient.comments.list({
          part: "snippet",
          parentId: parentCommentId
        });
      })
    )
  )
    .filter(notUndefined)
    .map(nonNullResult => nonNullResult?.data.items)
    .filter(notUndefined)
    // flatten
    .reduce((acc, value) => acc.concat(value), []);

  let commentThreadsBatch = firestore.batch();

  let commentThreadsColRef = firestore
    .collection("external")
    .doc("youtube_data_api")
    .collection("commentThreads");

  youtubeCommentThreads.map(thread => {
    if (thread.id) {
      const docRef = commentThreadsColRef.doc(thread.id);
      commentThreadsBatch.set(docRef, thread);
    } else {
      console.error(``);
    }
  });

  await commentThreadsBatch.commit();

  const commentsBatch = firestore.batch();

  let commentsColRef = firestore
    .collection("external")
    .doc("youtube_data_api")
    .collection("comments");

  youtubeComments.map(comment => {
    if (comment.id) {
      const docRef = commentsColRef.doc(comment.id);
      commentsBatch.set(docRef, comment);
    } else {
      console.error(``);
    }
  });

  await commentsBatch.commit();

  return {
    youtubeCommentThreads,
    youtubeComments
  };
};
