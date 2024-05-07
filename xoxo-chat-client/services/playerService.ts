import HttpService from './HttpService';

export type Player = {
  _id: string;
  username: string;
};

export default new HttpService<Player>('/users');
