import ProfileComponent from '@/app/profile/ProfileComponent';
import ProfileInformation from '@/app/profile/ProfileInformation';

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="w-[72%] space-y-6 p-4 pb-6">
      <div className="bg-secondary">
        <ProfileComponent prop={{ id: params.id, type: 'param' }} />
      </div>
      <ProfileInformation userId={params.id} />
    </div>
  );
}
