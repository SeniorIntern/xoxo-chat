type SocketPaylod = {
  conversationId: string;
  sender: string;
  text?: string;
  updatedAt: Date;
  attachmentUrls: string[];
};

type Message = {
  _id: string;
  conversationId: string;
  sender: string;
  text?: string;
  attachmentUrls: string[];
  updatedAt: string;
};

type Payload = {
  _id: string;
  username: string;
  email: string;
  token: string;
};

type Session = {
  payload: Payload;
  expires: number;
};

type Member = {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
};

type Conversation = {
  _id: string;
  members: Member[];
};

type PlayerIntro = {
  shortIntro: string;
  study: string;
  location: string;
  job: string;
};

type Player = {
  _id: string;
  username: string;
  friends: [string];
  profileImage: string;
  coverImage: string;
  intro: PlayerIntro;
  about: string;
};

type PlayerData = {
  type: 'player';
  data: Player;
};

type ConversationData = {
  type: 'conversation';
  data: Conversation;
  userId: string;
};

type Gif = {
  id: string;
  images: {
    original: {
      height: string;
      width: string;
      url: string;
    };
  };
};

type GifFetchResponse = {
  data: Gif[];
  meta: {
    msg: string;
    status: number;
    response_id: string;
  };
};

type Like = {
  _id: string;
  userId: string;
};

type Tweet = {
  _id: string;
  user: Player;
  tweetContent: string;
  attachmentUrls: string[];
  comments: string[];
  likes: Like[];
  createdAt: string;
  updatedAt: string;
};

type Comment = {
  _id: string;
  commentContent: string;
  userId: string;
  profileImage: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

type TweetWithComment = {
  _id: string;
  user: string;
  tweetContent: string;
  attachmentUrls: string[];
  comments: Comment[];
  likes: Like[];
  createdAt: string;
  updatedAt: string;
};

export {
  Conversation,
  ConversationData,
  Gif,
  GifFetchResponse,
  Like,
  Member,
  Message,
  MessageRequest,
  Payload,
  Player,
  PlayerData,
  PlayerIntro,
  Session,
  SocketPaylod,
  Tweet,
  TweetWithComment
};
