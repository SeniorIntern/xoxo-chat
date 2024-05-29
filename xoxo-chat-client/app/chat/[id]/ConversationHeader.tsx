'use client';

import useConversationStore from '@/app/store/conversationStore';
import Image from 'next/image';

import getConversationMember from '../getConversationMember';
import { PLACEHOLDER_PROFILE_IMAGE } from '@/constants';

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
                  .profileImage || PLACEHOLDER_PROFILE_IMAGE
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
