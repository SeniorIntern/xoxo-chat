import { Button } from '@/components/ui/button';
import { GraduationCap, Home } from 'lucide-react';

const ProfileBio = () => {
  return (
    <div className="grow space-y-2 rounded-md bg-[var(--secondary-gray)] p-2">
      <p className="text-xl font-bold">Intro</p>
      <p className="text-center">I like ice-cream</p>
      <Button className="w-full bg-[var(--third-gray)]">Edit bio</Button>
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

export default ProfileBio;
