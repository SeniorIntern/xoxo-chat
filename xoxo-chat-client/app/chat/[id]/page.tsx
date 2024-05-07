import { getSession } from '@/action';
import apiClient from '@/services/apiClient';
import classnames from 'classnames';
import { Info } from 'lucide-react';
import { format } from 'timeago.js';
import UserInfo from '../UserInfo';
import MessageForm from './MessageForm';

type Message = {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  updatedAt: string;
};

export default async function Page({ params }: { params: { id: string } }) {
  const messages = await apiClient.get<Message[]>('/messages/' + params.id);
  const profileObject = await getSession();

  return (
    <>
      <section className="flex grow flex-col">
        <div className="flex h-[var(--bar-height)] justify-between p-4">
          <span>John Wick</span>
          <span></span>
          <span>
            <Info />
          </span>
        </div>
        <div
          style={{ maxHeight: 'calc(100vh - 168px)' }}
          className="flex grow flex-col overflow-y-auto p-2"
        >
          {messages.data.map((message) => (
            <div
              key={message._id}
              className={classnames('my-4 space-y-2', {
                'self-end': message.sender == profileObject?.payload._id
              })}
            >
              <span className="rounded-3xl bg-[var(--accent)] p-2">
                {message.text}
              </span>
              <p className="text-sm text-gray-400">
                {format(message.updatedAt)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex h-[var(--bar-height)] items-center space-x-2 px-2 py-4">
          <MessageForm
            sender={profileObject?.payload._id}
            conversationId={params.id}
          />
        </div>
      </section>

      <section className="w-[24%] space-y-4 p-4">
        <UserInfo />
      </section>
    </>
  );
}
