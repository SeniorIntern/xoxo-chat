import Image from 'next/image';
import Link from 'next/link';
import Logo from './logo.png';
import UserNav from '@/app/UserNav';

const Header = () => {
  return (
    <nav className="flex h-[var(--bar-height)] items-center justify-between border-b border-[var(--secondary-gray)] px-4 py-2">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <div className="relative h-10 w-10">
            <Image
              src={Logo}
              alt="profile image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>
        </Link>
        <Link href="/chat">Chat</Link>
        <Link href="/players">Players</Link>
      </div>
      <UserNav />
    </nav>
  );
};

export default Header;
