'use client';

import useConversationStore from '@/app/store/conversationStore';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useConversations } from '@/hooks';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

import ChatCreateGroupDialog from './ChatCreateGroupDialog';
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
    <ScrollArea
      style={{
        maxHeight: 'calc(100vh - 56px)',
        height: 'calc(100vh - 56px)'
      }}
      className="w-[28%] bg-secondary p-2"
    >
      <aside>
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Chats</p>
            {userId && <ChatCreateGroupDialog userId={userId} />}
          </div>
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
            <div>
              {conversations?.map((c) => (
                <Link
                  href={`/chat/${c._id}`}
                  onClick={() => {
                    setConversation(c);
                  }}
                  className={cn(
                    'block cursor-pointer rounded-md p-2',
                    conversation?._id === c._id && 'bg-muted'
                  )}
                  key={c._id}
                >
                  <UserListItem
                    userData={{
                      type: 'conversation',
                      data: c,
                      userId: userId
                    }}
                  >
                    <p className="text-sm text-mutedtext">
                      <span>{c.lastSender == userId && 'You: '}</span>
                      {c.lastMessage}
                    </p>
                  </UserListItem>
                </Link>
              ))}
            </div>
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
    </ScrollArea>
  );
};

export default ConversationList;
