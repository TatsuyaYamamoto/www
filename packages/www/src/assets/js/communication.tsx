import * as React from "react";
import * as ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

import { youtube_v3 } from "googleapis";

const CHANNEL_ID = "UCf-Z2GqqJs6-Sy7rpy0GHsg";

const CommentRoot = styled.div`
  margin: 30px;
`;

const VideoThumbnail = styled.div`
  position: relative;
`;

const Tape = styled.div`
  width: 40px;

  position: absolute;
  top: -20px;

  background: repeating-linear-gradient(
    -45deg,
    rgba(139, 198, 202, 0.3),
    rgba(139, 198, 202, 0.3) 10px,
    #fff 0,
    #fff 20px
  );
  transform: rotate(-10deg);
  padding: 0.8em;
  color: #65513f;
`;

const VideoImage = styled.img`
  width: 70px;
`;

const UserComment = styled.div`
  position: relative;
  font-family: "Hui";
  font-size: 20px;
`;

const CommentDate = styled.span`
  transform: rotate(-2deg);

  ::after {
    content: "\\A";
    white-space: pre;
  }
`;

const CommentText = styled.span`
  margin-left: 50px;
  box-decoration-break: clone;
`;

const UserName = styled.span`
  margin-left: 20px;

  vertical-align: middle;
  transform: rotate(1deg);
`;

const ChannelComment = styled.div`
  font-family: "Hui", Sans-Serif;
  font-size: 15px;

  line-height: 1em;

  text-align: right;
  margin-top: 5px;
`;

const ChannelCommentText = styled.span`
  color: #ff5f08;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

interface CommentProps {
  comment: youtube_v3.Schema$CommentThread;
  showThumbnail: boolean;
}

const Comment: React.FC<CommentProps> = ({ comment, showThumbnail }) => {
  const channelComment = comment.replies.comments.find(comment => {
    return comment.snippet.authorChannelId.value === CHANNEL_ID;
  });
  const date = new Date(comment.snippet.topLevelComment.snippet.publishedAt);
  const dateText = `${date.getFullYear()}/${date.getMonth() +
    1}/${date.getDate()}`;
  const userComment = comment.snippet.topLevelComment.snippet.textDisplay;
  const userName = comment.snippet.topLevelComment.snippet.authorDisplayName;
  const channelCommentText = channelComment.snippet.textDisplay;

  const videoId = comment.snippet.videoId;
  const videoThumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <CommentRoot>
      {showThumbnail && (
        <a href={videoUrl} target="__blank">
          <VideoThumbnail>
            <Tape />
            <VideoImage src={videoThumbnailUrl} />
          </VideoThumbnail>
        </a>
      )}
      <UserComment>
        <CommentDate>{dateText}</CommentDate>
        <CommentText dangerouslySetInnerHTML={{ __html: userComment }} />
        <UserName dangerouslySetInnerHTML={{ __html: userName }} />
      </UserComment>

      <ChannelComment>
        <ChannelCommentText
          dangerouslySetInnerHTML={{ __html: channelCommentText }}
        />
      </ChannelComment>
    </CommentRoot>
  );
};

const NoteRoot = styled.div`
  max-width: 600px;
  margin: 2em auto;

  color: #696969;
  background-color: #fff;
  font-weight: bold;
  border: solid 1px #e6e6e6;
  padding: 0.3em 1em 2em 1em;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
`;

const Sen = styled.div`
  background-color: #fff;
  background-image: linear-gradient(
      90deg,
      rgba(237, 119, 128, 0) 0%,
      rgba(237, 119, 128, 0) 50%,
      #fff 0%,
      #fff 100%
    ),
    linear-gradient(
      180deg,
      rgba(100, 100, 100, 0) 0%,
      rgba(100, 100, 100, 0) 97.5%,
      #646464 100%
    );
  background-size: 8px 100%, 100% 2em;
  padding: 2em 1em 0.2em 1em;
`;
interface NoteProps {
  comments: youtube_v3.Schema$CommentThread[];
}

const Note: React.FC<NoteProps> = props => {
  const comments = React.useMemo(() => {
    const _comments = [];
    let prevVideoId: string | null = null;

    for (const comment of props.comments) {
      const videoId = comment.snippet.videoId;
      const showThumbnail = prevVideoId !== videoId;
      prevVideoId = videoId;

      _comments.push({
        comment,
        showThumbnail
      });
    }

    return _comments;
  }, [props.comments]);

  return (
    <NoteRoot>
      <Sen>
        {comments.map(({ comment, showThumbnail }) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              showThumbnail={showThumbnail}
            />
          );
        })}
      </Sen>
    </NoteRoot>
  );
};

// https://www.nxworld.net/tips/js-array-chunk.html
const arrayChunk = ([...array], size = 1) => {
  return array.reduce(
    (acc, value, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  );
};

interface NoteListProps {
  comments: youtube_v3.Schema$CommentThread[];
}

const NoteList: React.FC<NoteListProps> = props => {
  const { comments } = props;
  const commentBlocks = React.useMemo<
    youtube_v3.Schema$CommentThread[][]
  >(() => {
    return arrayChunk(comments, 5);
  }, [comments]);

  return (
    <div>
      {commentBlocks.map((commentBlock, index) => {
        return <Note key={index} comments={commentBlock} />;
      })}
    </div>
  );
};

const Root = styled.div`
  min-height: 500px;
`;

const CommunicationPage: React.FC = () => {
  const [comments, setComments] = React.useState<
    youtube_v3.Schema$CommentThread[]
  >([]);

  React.useEffect(() => {
    fetch(
      "https://api-dev.sokontokoro-factory.net/youtube/comments"
    )
      .then(res => res.json())
      .then(data => {
        setComments(data);
      });
  }, []);

  return (
    <Root>
      <NoteList comments={comments} />
    </Root>
  );
};

// TODO
// @ts-ignore
import HuiFontP from "../../../../cdn/public/fonts/HuiFontP29.ttf";
const huiFontPrl =
  process.env.NODE_ENV === "local"
    ? HuiFontP
    : "https://cdn.sokontokoro-factory.net/fonts/HuiFontP29.ttf";
const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Hui';
        src: url(${huiFontPrl}) format("truetype");
    }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <CommunicationPage />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
