type SocketPaylod = {
  conversationId: string;
  sender: string;
  text: string;
  updatedAt: Date;
};

type Message = {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  updatedAt: string;
};

type MessageRequest = {
  text: string;
  sender: string;
  conversationId: string;
};

type Session = {
  payload: {
    _id: string;
    email: string;
    token: string;
  };
  expires: number;
};

export type Member = {
  _id: string;
  username: string;
  email: string;
};

export type Conversation = {
  _id: string;
  members: Member[];
};

export type Player = {
  _id: string;
  username: string;
  friends: [string];
  profileImage?: string;
  coverImage?: string;
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

export {
  SocketPaylod,
  Message,
  MessageRequest,
  Session,
  Member,
  Conversation,
  Player,
  PlayerData,
  ConversationData,
  Gif,
  GifFetchResponse
};
