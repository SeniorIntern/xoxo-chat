import ProfileComponent from '@/app/ProfileComponent';
import ProfileInformation from '@/app/ProfileInformation';

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="w-[72%] p-4">
      <ProfileComponent paramId={params.id} />
      <ProfileInformation />
    </div>
  );
}
