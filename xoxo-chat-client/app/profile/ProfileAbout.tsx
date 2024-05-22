'use client';

import { Player } from '@/app/types';
import { useState } from 'react';

import ProfileAboutEditDialog from './ProfileAboutEditDialog';

type Props = {
  user: Player;
};

const ProfileAbout = ({ user }: Props) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  console.log('mounted');

  return (
    <div className="h-fit w-[58%] space-y-4 rounded-md bg-secondary p-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">About</p>
        {user?.about && (
          <ProfileAboutEditDialog about={user?.about} id={user?._id} />
        )}
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
