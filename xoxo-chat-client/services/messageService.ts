import { Message } from '@/app/types';
import HttpService from './HttpService';

export default new HttpService<Message>('/messages');
