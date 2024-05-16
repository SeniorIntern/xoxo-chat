import { getSession } from '@/action';

import ProfileComponent from '../ProfileComponent';
import ProfileInformation from '../ProfileInformation';

export default async function Page() {
  const profileObject = await getSession();
  const profile = JSON.stringify(profileObject, null, 2);

  return (
    <div className="px-24 py-4">
      <ProfileComponent userId={profileObject?.payload._id} />
      <ProfileInformation />
    </div>
  );
}
