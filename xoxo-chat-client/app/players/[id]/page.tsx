import ProfileComponent from '@/app/profile/ProfileComponent';
import ProfileInformation from '@/app/profile/ProfileInformation';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <ScrollArea
      className="w-[72%] overflow-y-scroll"
      style={{ maxHeight: 'calc(100vh - 56px)' }}
    >
      <div className="space-y-6">
        <div className="bg-secondary">
          <ProfileComponent prop={{ id: params.id, type: 'param' }} />
        </div>
        <ProfileInformation hideDialog={true} userId={params.id} />
      </div>
    </ScrollArea>
  );
}
