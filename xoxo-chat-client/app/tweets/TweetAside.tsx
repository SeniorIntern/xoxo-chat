import { Payload } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Bell,
  Bookmark,
  CircleEllipsis,
  Home,
  Mail,
  Search,
  User,
  Users,
  X
} from 'lucide-react';
import Link from 'next/link';

import TweetAsideControl from './TweetAsideControl';
import { TweetForm } from './TweetForm';

type Props = {
  user: Payload;
};

const TweetAside = ({ user }: Props) => {
  const tweetAsideOptions = [
    { icon: <Home />, option: 'Home', href: '/tweets' },
    { icon: <Search />, option: 'Explore', href: '/tweets' },
    { icon: <Bell />, option: 'Notifications', href: '/tweets' },
    { icon: <Mail />, option: 'Messages', href: '/chat' },
    { icon: <Bookmark />, option: 'Bookmarks', href: '/tweets/bookmarks' },
    { icon: <Users />, option: 'Communities', href: '/players' },
    { icon: <X />, option: 'Premium', href: '/tweets' },
    { icon: <User />, option: 'Profile', href: '/profile' },
    { icon: <CircleEllipsis />, option: 'More', href: '/tweets' }
  ];

  return (
    <aside className="flex flex-col px-3 pt-1">
      <div className="space-y-2">
        <nav className="flex flex-col px-2">
          {tweetAsideOptions.map((o, index) => (
            <Link
              key={index}
              href={o.href}
              className="flex w-fit items-center gap-4 rounded-full p-3 pr-8 text-xl hover:bg-secondary/70"
            >
              {o.icon}
              <span>{o.option}</span>
            </Link>
          ))}
        </nav>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="cyan"
              className="w-[96%] rounded-full py-6 font-bold"
            >
              Post
            </Button>
          </DialogTrigger>
          <DialogContent className="top-[20%] bg-black p-0">
            <DialogHeader className="p-0"></DialogHeader>
            <TweetForm />
          </DialogContent>
        </Dialog>
      </div>

      <TweetAsideControl user={user} />
    </aside>
  );
};

export default TweetAside;
