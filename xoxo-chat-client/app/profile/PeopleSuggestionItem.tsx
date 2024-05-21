import { Player } from '@/app/types';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  user?: Player;
};

const PeopleSuggestionItem = ({ user }: Props) => {
  return (
    <div className="w-40 rounded-md border">
      <div className="relative h-36 w-full">
        <Image
          src={
            user?.profileImage
              ? user.profileImage
              : 'https://picsum.photos/id/40/4106/2806'
          }
          alt="profile image"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t"
        />
      </div>
      <div className="flex h-28 flex-col place-content-between space-y-2 p-3">
        <Link href={`/players/${user?._id}`}>{user?.username}</Link>
        <Button className="space-x-2 px-4">
          <UserPlus size="18" fill="white" />
          <span>Add Friend</span>
        </Button>
      </div>
    </div>
  );
};

export default PeopleSuggestionItem;
