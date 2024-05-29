'use client';

import { useComments } from '@/hooks';
import { format } from 'timeago.js';

const TweetCommentList = ({ tweetId }: { tweetId: string }) => {
  const { data: tweet, isLoading, error } = useComments(tweetId);

  return (
    <div className="my-8">
      {tweet && (
        <div className="space-y-4">
          {tweet.comments.map((comment) => (
            <div key={comment._id}>
              <div className="w-fit rounded-md bg-secondary p-2">
                <p className="space-x-2 text-mutedtext">{comment.userId} </p>
                <p>{comment.commentContent}</p>
              </div>
              <span className="text-mutedtext">
                {format(comment.createdAt)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TweetCommentList;
