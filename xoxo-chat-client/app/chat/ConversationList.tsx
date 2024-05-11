'use client';

import classNames from 'classnames';
import Link from 'next/link';
import useConversations from '../../hooks/useConversations';
import useConversationStore from '../store/conversationStore';
import UserListItem from './UserListItem';

const ConversationList = ({ userId }: { userId: string }) => {
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
              'bg-[var(--conversation-active)]': conversation?._id === c._id
            },
            'cursor-pointer rounded-md p-2 hover:bg-[var(--secondary-gray)]'
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
