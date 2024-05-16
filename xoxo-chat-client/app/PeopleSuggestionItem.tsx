import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import Image from 'next/image';

const PeopleSuggestionItem = () => {
  return (
    <div className="border border-[var(--secondary-gray)] w-40">
      <div className="relative h-36 w-full">
        <Image
          src={'https://picsum.photos/id/40/4106/2806'}
          alt="profile image"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t"
        />
      </div>
      <div className="flex h-28 flex-col place-content-between space-y-2 p-3">
        <p>John Wick</p>
        <Button className="space-x-2 bg-[var(--prime)] px-4 hover:bg-[var(--prime-hover)]">
          <UserPlus size="18" fill="white" />
          <span>Add Friend</span>
        </Button>
      </div>
    </div>
  );
};

export default PeopleSuggestionItem;
