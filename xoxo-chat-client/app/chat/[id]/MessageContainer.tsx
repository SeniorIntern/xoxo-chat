'use client';

import useSocket from '@/app/store/socketStore';
import { SocketPaylod } from '@/app/types';
import useMessages from '@/hooks/useMessages';
import { cn } from '@/lib/utils';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';

type Props = {
  sender: string;
  conversationId: string;
};

const MessageContainer = ({ sender, conversationId }: Props) => {
  const [chats, setChats] = useState<SocketPaylod[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(
        `react- connectionId: ${socket.id}. conversationId: ${conversationId}`
      );
    });

    socket.on(conversationId, (data: SocketPaylod) =>
      setChats([...chats, data])
    );

    document
      .getElementById('chat-bottom')
      ?.scrollIntoView({ behavior: 'smooth' });

    return () => {
      socket.off('connect');
      socket.off(conversationId);
    };
  }, [chats]);

  const { socket } = useSocket();

  const { data: messages, isLoading, error } = useMessages(conversationId);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  console.log('mounted');

  return (
    <div
      style={{ maxHeight: 'calc(100vh - 168px)' }}
      className="flex grow flex-col overflow-y-auto p-2"
    >
      {/* messages from (old)database */}
      {messages?.map((message) => (
        <div
          key={message._id}
          className={cn(
            classnames('my-4 flex flex-col items-start space-y-2', {
              'items-end': message.sender == sender
            })
          )}
        >
          <p className="w-fit rounded-2xl bg-primary px-4 py-1">
            {message.text}
          </p>
          <p className="text-sm text-gray-400">{format(message.updatedAt)}</p>
        </div>
      ))}

      {/* messages from (real-time)socketIO */}
      {chats.map((message, index) => (
        <div
          key={index}
          className={classnames('my-4 flex flex-col items-end space-y-2', {
            'self-end': message.sender == sender
          })}
        >
          <p className="w-fit rounded-2xl bg-primary px-4 py-1">
            {message.text}
          </p>
          <p className="text-sm text-gray-400">{format(message.updatedAt)}</p>
        </div>
      ))}
      <span id="chat-bottom"></span>
    </div>
  );
};

export default MessageContainer;
