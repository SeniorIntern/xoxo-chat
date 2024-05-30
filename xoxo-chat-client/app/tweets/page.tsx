'use client';

import { Separator } from '@/components/ui/separator';
import { useTweets } from '@/hooks';

import { TweetForm } from './TweetForm';
import { TweetsContainer } from './TweetsContainer';

export default function Page() {
  console.log('mounted');

  const { data: tweets, isLoading, error } = useTweets();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  console.log('tweets===', tweets);
  return (
    <section className="flex grow flex-col overflow-y-scroll">
      <TweetForm />
      <Separator />

      {tweets && <TweetsContainer tweets={tweets} />}
    </section>
  );
}
