import { google, youtube_v3 } from "googleapis";

import { apps } from "./firebase";
import config from "../config";

const CHANNEL_ID = "UCf-Z2GqqJs6-Sy7rpy0GHsg";

const firestore = apps.default.firestore();

// TODO: load ID list from youtube data api.
const TARGET_VIDEO_IDS = [
  // 海沿いのセブンイレブンの近くで、梨子ちゃんが歌ってた【桜内梨子 レンジでふわもち！サンドイッチ】
  "tSrIcSGTK60",
  // Cafe Aqours Vol. 1 君のこころは輝いてるかい？ ラブライブ！サンシャイン!! アコースティックアレンジメドレー
  "IKrST1ZwIvE",
  // 【MV / Arrange / Remix】Marine Border Parasol【高海千歌 / 桜内梨子 / 渡辺 曜】
  "-ZN5tigIe-E",
  // 【Arrange / MV】ぶる～べりぃ♡とれいん 【南ことり】
  "671qsGdUuUE",
  // (T28＾ω＾つ静岡県道17号沼津土肥線上のシンデレラ【G線上のシンデレラ / Arrange / MV】
  "g8qJsZ8Lbx4",
  // (T28＾ω＾つ僕は毎日が告白日和【、です！ / arrange】
  "peMCKpKCTlY",
  // 【MV / Arrange】Awaken the power【Saint Aqours Snow】
  "ooKG_LTfSDM",
  // 【MV / Arrange】Snow halation【μ’s / 南ことり】
  "D6HZrIEa-nc",
  // (T28＾ω＾つ今週のwkwk決まったかな【Waku-Waku-Week! / Arrange】
  "aj99WR-uKRA",
  // (T28＾ω＾つ僕も海岸通りで待ってる【よ / Arrange】
  "kOywGc4JW8Q",
  // 【MV / Arrange】ジングルベルがとまらない【Aqours】
  "eIMIxFKIv3M"
];

const youtubeClient = google.youtube({
  version: "v3",
  auth: config.youtube_data_api.api_key
});

function notUndefined<T>(item: T | undefined): item is T {
  return item !== undefined;
}

// TODO: performance tuning!
export const cacheCommentResources = async () => {
  const youtubeCommentThreads = (
    await Promise.all(
      TARGET_VIDEO_IDS.map(videoId => {
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

  const youtubeCommentThreadsWithReplies = youtubeCommentThreads.map(thread => {
    const parentCommentId = thread.id;

    const replies = youtubeComments.filter(comment => {
      return comment.snippet?.parentId === parentCommentId;
    });

    const hasChannelReply = !!replies.find(
      (reply: youtube_v3.Schema$Comment) => {
        return CHANNEL_ID === reply.snippet?.authorChannelId.value;
      }
    );

    const withReplies: youtube_v3.Schema$CommentThread & {
      hasChannelReply: boolean;
    } = {
      ...thread,
      replies: {
        comments: replies
      },
      hasChannelReply
    };

    return withReplies;
  });

  let commentThreadsBatch = firestore.batch();

  let commentThreadsColRef = firestore
    .collection("external")
    .doc("youtube_data_api")
    .collection("commentThreads");

  youtubeCommentThreadsWithReplies.map(thread => {
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

export const getCommentsRepliedByChannel = async (
  videoId?: string,
  maxResult = 20,
  cursorDocId?: string
) => {
  let commentThreadsColRef = firestore
    .collection("external")
    .doc("youtube_data_api")
    .collection("commentThreads");

  let query = commentThreadsColRef
    .where("hasChannelReply", "==", true)
    .orderBy("snippet.topLevelComment.snippet.publishedAt", "desc")
    .limit(maxResult);

  if (cursorDocId) {
    query.where("snippet.videoId", "==", videoId);
  }

  if (cursorDocId) {
    const cursorDocRef = firestore.collection("cities").doc("SF");
    const cursorSnap = await cursorDocRef.get();
    query.startAt(cursorSnap);
  }

  const threadSnap = await query.get();
  const threadDocs = threadSnap.docs;

  return threadDocs.map(doc => {
    return doc.data() as youtube_v3.Schema$CommentThread;
  });
};
