import { getSession } from '@/action';
import ConversationList from './ConversationList';
import { Input } from '@/components/ui/input';

export default async function ChatLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const profileObject = await getSession();
  const userId = profileObject?.payload._id!;

  return (
    <div className="flex grow divide-x bg-secondary">
      <section className="w-[28%]">
        <div className="space-y-4 p-4">
          <p className="text-xl font-bold">Chats</p>
          <Input
            className="w-full rounded-full border-none bg-muted px-4 py-2 text-white"
            placeholder="Search friend"
          />
        </div>
        <div className="mt-2">
          <ConversationList userId={userId} />
        </div>
      </section>
      {children}
    </div>
  );
}
