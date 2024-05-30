import UserNav from '@/components/reusables/UserNav';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

const TweetAside = () => {
  const tweetAsideOptions = [
    { icon: <Home />, option: 'Home', href: '/' },
    { icon: <Home />, option: 'Home', href: '/' },
    { icon: <Home />, option: 'Home', href: '/' },
    { icon: <Home />, option: 'Home', href: '/' },
    { icon: <Home />, option: 'Home', href: '/' },
    { icon: <Home />, option: 'Home', href: '/' },
    { icon: <Home />, option: 'Home', href: '/' },
    { icon: <Home />, option: 'Home', href: '/' }
  ];

  return (
    <aside className="flex w-[22%] flex-col justify-between p-6">
      <div className="space-y-8">
        <nav className="flex flex-col gap-8">
          {tweetAsideOptions.map((o, index) => (
            <Link
              key={index}
              href={o.href}
              className="flex w-full items-center gap-2 bg-orange-400 text-xl hover:bg-secondary"
            >
              {o.icon}
              <span>{o.option}</span>
            </Link>
          ))}
        </nav>
        <Button className="w-[96%] rounded-full bg-primary py-6 font-extrabold">
          POST
        </Button>
      </div>

      <UserNav />
    </aside>
  );
};

export default TweetAside;
