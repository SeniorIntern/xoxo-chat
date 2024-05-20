import CardContainer from '@/app/CardContainer';
import { Gif, GifFetchResponse } from '@/app/types';

import GameControls from './GameControls';

export default async function Home() {
  const res = await fetch(
    'https://api.giphy.com/v1/gifs/search?api_key=SCz64Y4TAAXxvnjvV6i8CxzGJ6iHi0zq&q=dog&limit=9&rating=g&lang=en&bundle=messaging_non_clips'
  );
  const originalGifs: GifFetchResponse = await res.json();
  // create duplicate element of each array's item
  const duplicatedGifs = [...originalGifs.data, ...originalGifs.data];

  // Shuffle an array
  const shuffleArray = (array: Gif[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  shuffleArray(duplicatedGifs);

  return (
    <>
      <GameControls />
      <CardContainer gifs={duplicatedGifs} />
    </>
  );
}
