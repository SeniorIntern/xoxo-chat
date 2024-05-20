'use client';

import useGameStore from '@/app/store/gameStore';
import { Gif } from '@/app/types';
import { useWindowSize } from '@uidotdev/usehooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { toast } from 'sonner';

import QuestionMark from './QuestionMark.png';

type Props = {
  gifs: Gif[];
};

type CardSelection = {
  gifId: string;
  mapId: number;
};

const CardContainer = ({ gifs }: Props) => {
  console.log('mounted');
  
  const totalUniqueCards = 9;

  const { width, height } = useWindowSize();
  const { pairs, setPairs } = useGameStore();
  const [confettiTotal, setConfettiTotal] = useState(100);
  const [selections, setSelections] = useState<CardSelection[]>([]);

  useEffect(() => {
    if (selections.length === 2) {
      if (selections[0].gifId === selections[1].gifId) {
        setPairs(selections[0].gifId);
      }

      setTimeout(() => {
        setSelections([]);
      }, 750);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections, confettiTotal]);

  const isSelected = (mapId: number): boolean => {
    for (let i = 0; i < selections.length; i++) {
      if (selections[i].mapId === mapId) return true;
    }
    return false;
  };

  if (pairs.length === totalUniqueCards) {
    toast.success('Congratulations! You have won the game', {
      id: 'announcement'
    });

    setTimeout(() => {
      setConfettiTotal(0);
    }, 5000);
  }

  return (
    <section className="flex grow items-center justify-center">
      {pairs.length === totalUniqueCards && (
        <Confetti
          numberOfPieces={confettiTotal}
          width={width || 200}
          height={height || 200}
        />
      )}
      <div className="scale-up-center grid grid-cols-6 gap-10">
        {gifs.map((gif, index) => (
          <div
            className="relative h-32 w-32 transform cursor-pointer overflow-hidden rounded-2xl border-2 border-black transition-transform duration-300 hover:scale-110 hover:border-white"
            onClick={() =>
              setSelections([...selections, { gifId: gif.id, mapId: index }])
            }
            key={index}
          >
            <Image
              src={gif.images.original.url}
              alt="Gif image"
              fill
              unoptimized
              style={{
                objectFit: 'cover',
                display:
                  pairs.includes(gif.id) || isSelected(index) ? 'block' : 'none'
              }}
              className="absolute rounded-md"
            />
            {!pairs.includes(gif.id) && !isSelected(index) && (
              <Image
                src={QuestionMark}
                alt="GIF"
                style={{
                  display: 'block'
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardContainer;
