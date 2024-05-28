import { Tweet } from '@/app/types';
import { CACHE_KEY_TWEETS } from '@/constants';
import { tweetService } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useTweets = () => {
  return useQuery<Tweet[], Error>({
    queryKey: CACHE_KEY_TWEETS,
    queryFn: tweetService.getAll,
    refetchOnMount: 'always'
  });
};

export default useTweets;
