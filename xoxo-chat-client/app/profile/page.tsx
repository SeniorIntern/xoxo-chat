import { getSession } from '@/action';
import { Separator } from '@/components/ui/separator';

import ProfileComponent from './ProfileComponent';
import ProfileInformation from './ProfileInformation';

export default async function Page() {
  const profileObject = await getSession();
  const profile = JSON.stringify(profileObject, null, 2);

  return (
    <div className="space-y-6 pb-6">
      <div className="space-y-4 bg-secondary px-24 pb-4">
        <ProfileComponent userId={profileObject?.payload._id} />
        <Separator />
      </div>
      <div className="px-24">
        <ProfileInformation />
      </div>
    </div>
  );
}
