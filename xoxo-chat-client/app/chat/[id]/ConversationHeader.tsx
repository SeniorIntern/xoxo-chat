'use client';

import useConversationStore from '@/app/store/conversationStore';
import Image from 'next/image';

import getConversationMember from '../getConversationMember';

const ConversationHeader = ({ userId }: { userId: string }) => {
  const { conversation } = useConversationStore();

  console.log('mounted');

  return (
    <>
      {conversation && (
        <div className="flex h-[var(--bar-height)] items-center space-x-2 p-2">
          <div className="relative h-10 w-10">
            <Image
              src={
                getConversationMember(conversation?.members, userId)
                  .profileImage || 'https://picsum.photos/id/40/4106/2806'
              }
              alt="profile image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>
          <p className="font-semibold">
            {getConversationMember(conversation?.members, userId).username}
          </p>
        </div>
      )}
    </>
  );
};

export default ConversationHeader;
