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
import { useCommentTweet } from '@/hooks';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, SendHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { format } from 'timeago.js';

type Props = {
  tweet: Tweet;
};

const TweetComment = ({ tweet }: Props) => {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [comment, setComment] = useState('');

  const commentMutation = useCommentTweet();

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
        <div className="space-y-4">
          <ScrollArea className="h-64 w-full space-y-20 rounded-md p-2">
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

            <div>
              Lorem ipsum dolor sit amet, officia excepteur ex fugiat
              reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
              ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
              Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet
              voluptate voluptate dolor minim nulla est proident. Nostrud
              officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex
              occaecat reprehenderit commodo officia dolor Lorem duis laboris
              cupidatat officia voluptate. Culpa proident adipisicing id nulla
              nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua
              reprehenderit commodo ex non excepteur duis sunt velit enim.
              Voluptate laboris sint cupidatat ullamco ut ea consectetur et est
              culpa et culpa duis.
            </div>
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
