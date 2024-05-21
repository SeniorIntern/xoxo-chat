'use client';

import useMe from '@/hooks/useMe';
import { useState } from 'react';

import ProfileAboutEditDialog from './ProfileAboutEditDialog';

const ProfileAbout = () => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const { data: user, isLoading, error } = useMe();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  console.log('mounted');

  return (
    <div className="h-fit w-[58%] space-y-4 rounded-md bg-secondary p-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">About</p>
        <ProfileAboutEditDialog about={user?.about} />
      </div>
      {user?.about && (
        <p>
          {user?.about?.substring(
            0,
            showMore ? undefined : user.about.length / 2
          )}
          <span
            className="cursor-pointer text-blue-600"
            onClick={() => setShowMore((val) => !val)}
          >
            {showMore ? 'See less' : '...See more'}
          </span>
        </p>
      )}
    </div>
  );
};

export default ProfileAbout;
