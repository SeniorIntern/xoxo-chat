'use client';

import useMe from '@/hooks/useMe';
import { BriefcaseBusiness, GraduationCap, Home } from 'lucide-react';

import ProfileBioEditDialog from './ProfileBioEditDialog';

const ProfileIntro = () => {
  const { data: user, isLoading, error } = useMe();

  return (
    <div className="grow space-y-4 rounded-md bg-secondary p-4">
      <p className="text-xl font-bold">Intro</p>
      <p className="text-center">{user?.intro?.shortIntro}</p>
      <ProfileBioEditDialog userIntro={user?.intro} />
      <div className="flex flex-col space-y-4">
        <p className="inline-flex space-x-2 text-mutedtext">
          <GraduationCap />
          {user?.intro?.study ? (
            <span>
              Went to
              <span className="font-semibold"> {user?.intro?.study}</span>
            </span>
          ) : (
            <span> No schools to show </span>
          )}
        </p>
        <p className="inline-flex space-x-2 text-mutedtext">
          <Home />
          {user?.intro?.location ? (
            <span>
              Lives in
              <span className="font-semibold"> {user?.intro?.location}</span>
            </span>
          ) : (
            <span>No location to show</span>
          )}
        </p>
        <p className="inline-flex space-x-2 text-mutedtext">
          <BriefcaseBusiness />
          {user?.intro?.job ? (
            <span>
              Works at<span className="font-semibold"> {user?.intro?.job}</span>
            </span>
          ) : (
            <span>No workplace to show</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProfileIntro;
