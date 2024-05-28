import { Tweet } from '@/app/types';

import TweetCard from './TweetCard';

type Props = {
  tweets: Tweet[];
};

export const TweetsContainer = ({ tweets }: Props) => {
  const userId = 'asafkdjas';

  return (
    <>
      {userId && (
        <section className="flex flex-col divide-y">
          {tweets?.map((tweet) => (
            <TweetCard userId={userId} key={tweet._id} tweet={tweet} />
          ))}
        </section>
      )}
    </>
  );
};
