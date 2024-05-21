import { GifFetchResponse } from '@/app/types';
import { CACHE_KEY_GIFS } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGifs = () => {
  return useQuery<GifFetchResponse, Error>({
    queryKey: CACHE_KEY_GIFS,
    queryFn: () =>
      axios.get(
        'https://api.giphy.com/v1/gifs/search?api_key=SCz64Y4TAAXxvnjvV6i8CxzGJ6iHi0zq&q=dog&limit=9&rating=g&lang=en&bundle=messaging_non_clips'
      ),
    staleTime: 1 * 60 * 1000
  });
};

export default useGifs;
