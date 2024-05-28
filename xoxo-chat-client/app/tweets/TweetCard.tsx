'use client';

import { Tweet } from '@/app/types';
import { Button } from '@/components/ui/button';
import { useLikeTweet, useMe } from '@/hooks';
import { Bookmark, Heart, Repeat2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { format } from 'timeago.js';

import TweetComment from './TweetComment';
import TweetDelete from './TweetDelete';

type Props = {
  tweet: Tweet;
  userId: string;
};

const TweetCard = ({ tweet }: Props) => {
  const { data: user } = useMe();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const likeMutation = useLikeTweet();

  return (
    <article className="flex p-4">
      <div className="relative h-10 w-10">
        <Image
          src={tweet.user.profileImage}
          alt="User Profile picture"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-full"
        />
      </div>

      <div className="grow px-2">
        <div className="flex justify-between">
          <div className="space-x-2">
            <Link href={`players/${tweet.user._id}`} className="font-extrabold">
              {tweet.user.username}
            </Link>
            <span className="text-sm text-gray-400">
              {`@${tweet.user.username.toLowerCase()}`}
            </span>
            <span className="text-sm text-gray-400">
              {format(tweet.createdAt)}
            </span>
          </div>

          {user?._id === tweet.user._id && (
            <TweetDelete
              userId={user._id}
              tweetId={tweet.user._id}
              openDeleteDialog={openDeleteDialog}
              setOpenDeleteDialog={setOpenDeleteDialog}
            />
          )}
        </div>

        <div className="space-y-4">
          <p className="">{tweet.tweetContent}</p>
          {tweet.attachmentUrls.length > 0 &&
            tweet.attachmentUrls.map((attachment, index) => (
              <div key={index} className="relative h-60 w-full">
                <Image
                  src={attachment}
                  alt="Tweet attachment"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-md"
                />
              </div>
            ))}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <TweetComment tweet={tweet} />

          <Button variant={null} className="inline-flex gap-1 text-mutedtext">
            <Repeat2 size={20} />
            <span>0</span>
          </Button>

          <Button
            onClick={() => likeMutation.mutate(tweet._id)}
            disabled={likeMutation.isPending}
            variant={null}
            className="inline-flex gap-1 text-mutedtext"
          >
            <Heart size={20} />
            <span>{tweet.likes.length}</span>
          </Button>

          <Button variant={null} className="inline-flex gap-1 text-mutedtext">
            <Bookmark size={20} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default TweetCard;
