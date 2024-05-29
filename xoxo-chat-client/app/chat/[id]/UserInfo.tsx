'use client';

import { PLACEHOLDER_PROFILE_IMAGE } from '@/constants';
import useMembers from '@/hooks/useMembers';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  conversationId: string;
};

const UserInfo = ({ conversationId }: Props) => {
  const { data: members, isLoading, error } = useMembers(conversationId);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  console.log('mounted');

  return (
    <div className="flex flex-col items-center space-y-4">
      {members?.length === 1 && (
        <>
          <div className="relative h-20 w-20">
            <Image
              src={members[0].profileImage || PLACEHOLDER_PROFILE_IMAGE}
              alt="profile image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>
          <Link
            href={`/friends/${members[0]._id}`}
            className="inline-flex gap-2"
          >
            <span className="text-xl font-semibold hover:underline">
              {members[0].username}
            </span>
          </Link>
        </>
      )}
    </div>
  );
};

export default UserInfo;
