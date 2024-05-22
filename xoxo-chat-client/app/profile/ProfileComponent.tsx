'use client';

import { Button } from '@/components/ui/button';
import { useAddFriend, usePlayer } from '@/hooks';
import { UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import FriendSuggestions from './FriendSuggestions';
import ProfileEditDialog from './ProfileEditDialog';

type Props = {
  prop: {
    id: string;
    type: 'param' | 'user' | 'friend';
  };
};

const ProfileComponent = ({ prop }: Props) => {
  const mutation = useAddFriend();

  const { data: user, isLoading, error } = usePlayer(prop.id);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const router = useRouter();

  return (
    <section className="grow">
      <div className="relative h-96 w-full">
        <Image
          src={
            user?.coverImage
              ? user.coverImage
              : 'https://picsum.photos/id/40/4106/2806'
          }
          alt="cover photo"
          sizes="300px"
          fill
          className="rounded-b-md"
          style={{
            objectFit: 'cover'
          }}
        />
      </div>

      <div className="flex h-36 justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="relative h-44 w-44 self-end">
            <Image
              src={
                user?.profileImage
                  ? user.profileImage
                  : 'https://picsum.photos/id/40/4106/2806'
              }
              alt="profile image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full border-4 border-background"
            />
          </div>

          <div className="self-center">
            <p className="text-3xl font-semibold">{user?.username}</p>
            <p className="text-gray-400">{user?.friends.length} friends</p>
          </div>
        </div>

        <div className="self-center">
          {prop.type === 'param' && (
            <Button
              onClick={() => {
                mutation.mutate(prop.id);
                router.push('/players');
              }}
              className="inline-flex space-x-2 rounded-md px-4"
            >
              <UserPlus />
              <span>Add Friend</span>
            </Button>
          )}
          {prop.type === 'user' && user && <ProfileEditDialog user={user} />}
        </div>
      </div>

      {prop.type === 'user' && (
        <article className="rounded-md border border-gray-700 p-4">
          <div className="flex justify-between py-2">
            <p>People You May know</p>
            <Link href="/players" className="text-blue-600">
              See all
            </Link>
          </div>
          <FriendSuggestions />
        </article>
      )}
    </section>
  );
};

export default ProfileComponent;
