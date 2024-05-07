import HttpService from './HttpService';

export type Member = {
  _id: string;
  username: string;
  email: string;
};

export type Conversation = {
  _id: string;
  members: Member[];
};

export default new HttpService<Conversation>('/conversations');
