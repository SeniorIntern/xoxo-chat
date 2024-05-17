import { GraduationCap, Home } from 'lucide-react';

import ProfileBioEditDialog from './ProfileBioEditDialog';

const ProfileIntro = () => {
  return (
    <div className="grow space-y-4 bg-secondary rounded-md p-4">
      <p className="text-xl font-bold">Intro</p>
      <p className="text-center">I like ice-cream</p>
      <ProfileBioEditDialog />
      <div className="flex flex-col space-y-4">
        <p className="inline-flex space-x-2">
          <GraduationCap />
          <span>Went to</span>
        </p>
        <p className="inline-flex space-x-2">
          <Home />
          <span>Lives in</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileIntro;
