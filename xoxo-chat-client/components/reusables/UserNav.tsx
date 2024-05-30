import { getSession } from '@/action';
import Logout from '@/components/reusables/Logout';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

import { UserAvatar } from './UserAvatar';

const UserNav = async () => {
  const profileObject = await getSession();
  const userId = profileObject?.payload._id;

  if (userId)
    return (
      <DropdownMenu dir="ltr">
        <DropdownMenuTrigger>
          <UserAvatar hideName={true} userId={userId} />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="min-w-80 border-none bg-secondary"
        >
          <>
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer space-x-2 py-3">
                <UserAvatar userId={userId} />
              </DropdownMenuItem>
            </Link>
            <Separator />
            <DropdownMenuItem className="cursor-pointer space-x-2 py-3">
              <Logout />
            </DropdownMenuItem>
          </>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  else
    return (
      <Button asChild className="w-fit" variant="outline">
        <Link href="/login">Login</Link>
      </Button>
    );
};
export default UserNav;
