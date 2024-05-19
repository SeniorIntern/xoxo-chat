import { Gif, GifFetchResponse } from '@/app/types';
import axios, { CanceledError } from 'axios';
import { useEffect, useState } from 'react';

const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const endpont =
    'https://api.giphy.com/v1/gifs/search?api_key=SCz64Y4TAAXxvnjvV6i8CxzGJ6iHi0zq&q=dog&limit=9&rating=g&lang=en&bundle=messaging_non_clips';

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    axios
      .get<GifFetchResponse>(endpont, { signal: controller.signal })
      .then((res) => setGifs(res.data.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  return { gifs, isLoading, error };
};

export default useGifs;
