'use client';

import { Tweet } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import isLikedAlready from '@/helpers/isLikedAlready';
import { useAddComment, useLikeTweet } from '@/hooks';
import {
  Bookmark,
  Heart,
  MessageCircle,
  Repeat2,
  SendHorizontal
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { format } from 'timeago.js';

import TweetCommentList from './TweetCommentList';

type Props = {
  tweet: Tweet;
  userId: string;
};

const TweetComment = ({ tweet, userId }: Props) => {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [comment, setComment] = useState('');

  const commentMutation = useAddComment();

  const likeMutation = useLikeTweet();

  const handleSubmit = () => {
    if (comment.trim() === '') return;
    const payload = {
      tweetId: tweet._id,
      commentContent: comment.trim()
    };
    commentMutation.mutate(payload);
    setOpenCommentDialog(false);
  };

  return (
    <Dialog open={openCommentDialog} onOpenChange={setOpenCommentDialog}>
      <DialogTrigger asChild>
        <Button variant={null} className="inline-flex gap-1 text-mutedtext">
          <MessageCircle size={20} />
          <span>{tweet.comments.length}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-extrabold">
            {tweet.user.username} Post
          </DialogTitle>
        </DialogHeader>
        <div>
          <ScrollArea className="h-80 w-full overflow-y-scroll">
            <div className="flex gap-2">
              <div className="relative h-10 w-10">
                <Image
                  src={tweet.user.profileImage}
                  alt="profile image"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-full"
                />
              </div>
              <div className="">
                <Link
                  href={`players/${tweet.user._id}`}
                  className="font-extrabold"
                >
                  {tweet.user.username}
                </Link>
                <span className="text-sm text-gray-400">
                  {`@${tweet.user.username.toLowerCase()}`}
                </span>
                <p className="text-sm text-gray-400">
                  {format(tweet.createdAt)}
                </p>
              </div>
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

            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-mutedtext">
                <MessageCircle size={20} />
                <span>{tweet.comments.length}</span>
              </span>

              <span className="flex items-center gap-1 text-mutedtext">
                <Repeat2 size={20} />
                <span>0</span>
              </span>

              <Button
                onClick={() => likeMutation.mutate(tweet._id)}
                disabled={
                  likeMutation.isPending || isLikedAlready(tweet.likes, userId)
                }
                variant={null}
                className="inline-flex gap-1 text-mutedtext"
              >
                {isLikedAlready(tweet.likes, userId) ? (
                  <Heart size={20} fill="#F9197F" color="#F9197F" />
                ) : (
                  <Heart size={20} />
                )}
                <span>{tweet.likes.length}</span>
              </Button>

              <span className="flex items-center gap-1 text-mutedtext">
                <Bookmark className="text-mutedtext" size={20} />
              </span>
            </div>

            <Separator className="my-2" />

            <TweetCommentList tweetId={tweet._id} />
          </ScrollArea>

          <div className="flex w-full items-center">
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <Button
              disabled={commentMutation.isPending}
              type="submit"
              onClick={handleSubmit}
              variant={null}
            >
              <SendHorizontal size={24} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TweetComment;
