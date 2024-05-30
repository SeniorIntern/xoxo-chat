'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavOptions = () => {
  const path = usePathname();

  const options = [
    { option: 'Chat', href: '/chat' },
    { option: 'Tweets', href: '/tweets' },
    { option: 'Players', href: '/players' }
  ];

  return (
    <div className="flex items-center space-x-12">
      <Link href="/">
        <span className="text-3xl font-extrabold">XC</span>
      </Link>
      {options.map((o, index) => (
        <Link
          key={index}
          href={o.href}
          className={cn(path === o.href && 'font-semibold text-primary')}
        >
          {o.option}
        </Link>
      ))}
    </div>
  );
};

export default NavOptions;
