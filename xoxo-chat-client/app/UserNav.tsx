import { getSession } from '@/action';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
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

      <DropdownMenuContent
        align="end"
        className="min-w-80 border-none bg-secondary"
      >
        {profileObject?.payload.email ? (
          <>
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer space-x-2 py-3">
                <div className="relative h-8 w-8">
                  <Image
                    src={'https://picsum.photos/id/40/4106/2806'}
                    alt="profile image"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="cursor-pointer rounded-full"
                  />
                </div>
                <span className="font-semibold text-white">{'Nikhil'}</span>
              </DropdownMenuItem>
            </Link>
            <Separator />
            <DropdownMenuItem className="cursor-pointer space-x-2 py-3">
              <Logout />
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/login" className="w-full text-black">
              Login
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserNav;
