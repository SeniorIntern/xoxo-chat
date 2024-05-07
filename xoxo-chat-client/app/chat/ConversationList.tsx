'use client';

import Link from 'next/link';
import useConversations from '../../hooks/useConversations';
import UserListItem from './UserListItem';

const ConversationList = ({ userId }: { userId: string }) => {
  const { data: conversations, isLoading, error } = useConversations(userId);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  console.log('conversations=', conversations);

  return (
    <div className="space-y-4">
      {conversations?.map((conversation) => (
        <Link
          href={`/chat/${conversation._id}`}
          className="block"
          key={conversation._id}
        >
          <UserListItem
            userData={{
              type: 'conversation',
              data: conversation,
              userId: userId
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default ConversationList;
