import { getSession } from '@/action';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';

import ProfileComponent from './ProfileComponent';
import ProfileInformation from './ProfileInformation';

export default async function Page() {
  const profileObject = await getSession();
  if (!profileObject) redirect('/login');

  const profile = JSON.stringify(profileObject, null, 2);

  return (
    <div className="space-y-6 pb-6">
      <div className="space-y-4 bg-secondary px-24 pb-4">
        <ProfileComponent
          prop={{ id: profileObject?.payload._id, type: 'user' }}
        />
        <Separator />
      </div>
      <div className="px-24">
        <ProfileInformation userId={profileObject?.payload._id} />
      </div>
    </div>
  );
}
