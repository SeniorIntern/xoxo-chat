import UserNav from '@/app/UserNav';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="flex h-[var(--bar-height)] items-center justify-between border-b border-[var(--secondary-gray)] px-4 py-2">
      <div className="flex items-center space-x-12">
        <Link href="/">
          <span className="text-3xl font-extrabold">XC</span>
        </Link>
        <Link href="/chat">Chat</Link>
        <Link href="/players">Players</Link>
      </div>
      <UserNav />
    </nav>
  );
};

export default Header;
