'use client';

import useSocket from '@/app/store/socketStore';
import { Message, SocketPaylod } from '@/app/types';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';

type Props = {
  messages: Message[];
  sender: string;
  conversationId: string;
};

const MessageContainer = ({ messages, sender, conversationId }: Props) => {
  const { socket } = useSocket();
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

  return (
    <div
      style={{ maxHeight: 'calc(100vh - 168px)' }}
      className="flex grow flex-col overflow-y-auto p-2"
    >
      {messages.map((message) => (
        <div
          key={message._id}
          className={classnames('my-4 space-y-2', {
            'self-end': message.sender == sender
          })}
        >
          <span className="rounded-3xl bg-[var(--prime)] p-2">
            {message.text}
          </span>
          <p className="text-sm text-gray-400">{format(message.updatedAt)}</p>
        </div>
      ))}

      {/* messages from socket */}
      {chats.map((message, index) => (
        <div
          key={index}
          className={classnames('my-4 space-y-2', {
            'self-end': message.sender == sender
          })}
        >
          <span className="rounded-3xl bg-[var(--prime)] p-2">
            {message.text}
          </span>
          <p className="text-sm text-gray-400">{format(message.updatedAt)}</p>
        </div>
      ))}
      <span id="chat-bottom"></span>
    </div>
  );
};

export default MessageContainer;
