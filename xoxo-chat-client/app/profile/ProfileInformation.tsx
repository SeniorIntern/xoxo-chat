'use client';

import { usePlayer } from '@/hooks';

import ProfileAbout from './ProfileAbout';
import ProfileIntro from './ProfileIntro';

type Props = {
  userId: string;
  hideDialog?: boolean;
};

const ProfileInformation = ({ userId, hideDialog = false }: Props) => {
  const { data: user, isLoading, error } = usePlayer(userId);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {user && (
        <section className="flex gap-4 px-6">
          <ProfileIntro user={user} hideDialog={hideDialog} />
          <ProfileAbout user={user} hideDialog={hideDialog} />
        </section>
      )}
    </>
  );
};

export default ProfileInformation;
