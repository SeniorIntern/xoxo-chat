'use client';

import { usePlayer } from '@/hooks';

import ProfileAbout from './ProfileAbout';
import ProfileIntro from './ProfileIntro';

type Props = {
  userId: string;
};

const ProfileInformation = ({ userId }: Props) => {
  const { data: user, isLoading, error } = usePlayer(userId);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {user && (
        <section className="flex gap-4 px-6">
          <ProfileIntro user={user} />
          <ProfileAbout user={user} />
        </section>
      )}
    </>
  );
};

export default ProfileInformation;
