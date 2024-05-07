import { getSession } from '@/action';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import Logout from './Logout';

const UserNav = async () => {
  const profileObject = await getSession();

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <div className="relative h-10 w-10">
          <Image
            src={'https://picsum.photos/id/40/4106/2806'}
            alt="profile image"
            fill
            style={{ objectFit: 'cover' }}
            className="cursor-pointer rounded-full"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-fit">
        {profileObject?.payload.email ? (
          <>
            <Link href="/profile" className="text-black">
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Logout />
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/profile" className="text-black">
              Login
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserNav;
