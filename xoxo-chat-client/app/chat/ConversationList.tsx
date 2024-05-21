'use client';

import useConversationStore from '@/app/store/conversationStore';
import useConversations from '@/hooks/useConversations';
import classNames from 'classnames';
import Link from 'next/link';

import UserListItem from './UserListItem';

const ConversationList = ({ userId }: { userId: string }) => {
  console.log('mounted');

  const { data: conversations, isLoading, error } = useConversations(userId);
  const { conversation, setConversation } = useConversationStore();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div className="p-2">
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
            userData={{
              type: 'conversation',
              data: c,
              userId: userId
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default ConversationList;
