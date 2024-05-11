import { getSession } from '@/action';
import ConversationList from './ConversationList';

export default async function ChatLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const profileObject = await getSession();
  const userId = profileObject?.payload._id!;

  return (
    <div className="flex grow divide-x divide-[var(--secondary-gray)]">
      <section className="w-[28%]">
        <div className="space-y-4 p-4">
          <p className="text-xl font-bold">Chats</p>
          <input
            className="w-full rounded-3xl border-none bg-[var(--secondary-gray)] px-4 py-2 text-white focus:outline-none"
            placeholder="Search Messages"
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
