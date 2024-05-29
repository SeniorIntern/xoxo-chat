'use client';

import useConversationStore from '@/app/store/conversationStore';
import { Input } from '@/components/ui/input';
import { useConversations } from '@/hooks';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

import SearchChat from './SearchChat';
import UserListItem from './UserListItem';

const ConversationList = ({ userId }: { userId: string }) => {
  console.log('mounted');

  const [showChats, setShowChats] = useState(true);
  const { data: conversations, isLoading, error } = useConversations(userId);

  const { conversation, setConversation } = useConversationStore();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <aside>
      <div className="space-y-4 p-4">
        <p className="text-xl font-bold">Chats</p>
        {showChats && (
          <Input
            className="w-full rounded-full border-none bg-muted px-4 py-2 text-white"
            placeholder="Search chat"
            onFocus={() => setShowChats(false)}
          />
        )}
      </div>
      <div className="mt-2">
        {showChats ? (
          <aside>
            {conversations?.map((c) => (
              <Link
                onClick={() => setConversation(c)}
                href={`/chat/${c._id}`}
                className={classNames(
                  'block',
                  {
                    'bg-muted': conversation?._id === c._id
                  },
                  'cursor-pointer rounded-md p-2'
                )}
                key={c._id}
              >
                <UserListItem
                  isOnline={true}
                  userData={{
                    type: 'conversation',
                    data: c,
                    userId: userId
                  }}
                />
              </Link>
            ))}
          </aside>
        ) : (
          <>
            {conversations && (
              <SearchChat
                userId={userId}
                conversations={conversations}
                setShowChats={setShowChats}
              />
            )}
          </>
        )}
      </div>
    </aside>
  );
};

export default ConversationList;
