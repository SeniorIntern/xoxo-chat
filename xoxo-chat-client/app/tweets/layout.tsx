import { getSession } from '@/action';
import { ScrollArea } from '@/components/ui/scroll-area';

import TweetAside from './TweetAside';

export default async function TweetLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const profileObject = await getSession();
  const user = profileObject?.payload;

  return (
    <div className="flex grow divide-x bg-black">
      <ScrollArea
        style={{
          maxHeight: 'calc(100vh - 56px)',
          height: 'calc(100vh - 56px)'
        }}
        className="w-[22%] p-2"
      >
        {user && <TweetAside user={user} />}
      </ScrollArea>
      {children}
      <div className="w-[31%]"></div>
    </div>
  );
}
