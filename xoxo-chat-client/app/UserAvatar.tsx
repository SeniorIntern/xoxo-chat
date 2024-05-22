'use client';

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
          src={user?.profileImage || 'https://picsum.photos/id/40/4106/2806'}
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
