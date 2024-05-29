import { getSession } from '@/action';
import { ScrollArea } from '@/components/ui/scroll-area';

import ConversationList from './ConversationList';

export default async function ChatLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const profileObject = await getSession();
  const userId = profileObject?.payload._id;

  if (profileObject)
    return (
      <div className="flex grow divide-x bg-secondary">
        <ScrollArea
          style={{
            maxHeight: 'calc(100vh - 56px)',
            height: 'calc(100vh - 56px)'
          }}
          className="w-[28%] bg-secondary p-2"
        >
          {userId && <ConversationList userId={userId} />}
        </ScrollArea>
        {children}
      </div>
    );
}
