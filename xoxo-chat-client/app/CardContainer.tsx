'use client';

import { toast } from '@/components/ui/use-toast';
import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import Card from './Card';
import QuestionMark from './QuestionMark.png';
import useGameStore from './store/gameStore';
import { Gif } from './types';

type Props = {
  gifs: Gif[];
};

type CardSelection = {
  gifId: string;
  mapId: number;
};

const CardContainer = ({ gifs }: Props) => {
  const totalUniqueCards = 9;

  const { width, height } = useWindowSize();
  const { pairs, setPairs } = useGameStore();
  const [selections, setSelections] = useState<CardSelection[]>([]);

  console.log('selections= ', selections, selections?.length);
  console.log('widht=', width + 'height=', height);

  useEffect(() => {
    if (selections.length === 2) {
      if (selections[0].gifId === selections[1].gifId) {
        setPairs(selections[0].gifId);
      }

      setTimeout(() => {
        setSelections([]);
      }, 750);
    }
  }, [selections]);

  const isSelected = (mapId: number): boolean => {
    for (let i = 0; i < selections.length; i++) {
      if (selections[i].mapId === mapId) return true;
    }
    return false;
  };

  if (pairs.length === totalUniqueCards)
    toast({
      title: 'Congratulations! You have won the game',
      key: 'announcement'
    });

  return (
    <section className="flex grow items-center justify-center">
      {pairs.length === totalUniqueCards && (
        <Confetti width={width || 200} height={height || 200} />
      )}
      <div className="scale-up-center grid grid-cols-6 gap-10">
        {gifs.map((gif, index) => (
          <div
            className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-black"
            onClick={() =>
              setSelections([...selections, { gifId: gif.id, mapId: index }])
            }
            key={index}
          >
            <Card
              imageSrc={
                pairs.includes(gif.id) || isSelected(index)
                  ? gif.images.original.url
                  : QuestionMark
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardContainer;
