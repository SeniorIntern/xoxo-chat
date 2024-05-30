'use client';

import { PLACEHOLDER_PROFILE_IMAGE } from '@/constants';
import { usePlayer } from '@/hooks';
import { cn } from '@/lib/utils';
import classNames from 'classnames';
import Image from 'next/image';

type Props = {
  userId: string;
  hideName?: boolean;
};

export const UserAvatar = ({ userId, hideName = false }: Props) => {
  const { data: user, isLoading, error } = usePlayer(userId);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div
        className={cn(
          classNames('relative h-8 w-8', {
            'h-10 w-10': hideName
          })
        )}
      >
        <Image
          src={user?.profileImage || PLACEHOLDER_PROFILE_IMAGE}
          alt="profile image"
          fill
          style={{ objectFit: 'cover' }}
          className="cursor-pointer rounded-full"
        />
      </div>
      {!hideName && (
        <span className="font-semibold text-white">{user?.username}</span>
      )}
    </>
  );
};
