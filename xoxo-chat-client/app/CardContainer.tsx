'use client';

import Image from 'next/image';
import { useState } from 'react';
import QuestionMark from './QuestionMark.png';
import { Gif } from './types';

type Props = {
  duplicatedCategories: Gif[];
};

const CardContainer = ({ duplicatedCategories }: Props) => {
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [pairs, setPairs] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  const handleCardClick = (index: number, cardId: string) => {
    // don't check if clicked card is already a matched pair
    if (matchedPairs.includes(cardId)) return;

    setClickedCards([...clickedCards, index]);

    setPairs((prev) => {
      const updatedValue = [...prev, cardId];
      if (updatedValue.length == 2) {
        if (updatedValue[0] === updatedValue[1]) {
          setMatchedPairs([...matchedPairs, cardId]);
        }

        // reset for further card selection and pair matching
        setTimeout(() => {
          setClickedCards([]);
        }, 1000);
        return [];
      }
      return updatedValue;
    });
  };

  return (
    <section className="grid w-fit grid-cols-6 gap-16">
      {duplicatedCategories.map((category, index) => (
        <div
          key={index}
          className="relative h-36 w-36"
          onClick={() => handleCardClick(index, category.id)}
        >
          {clickedCards.includes(index) ||
            matchedPairs.includes(category.id) ? (
            <Image
              src={category.images.original.url}
              alt="profile image"
              unoptimized
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-md"
            />
          ) : (
            <Image
              src={QuestionMark}
              alt="profile image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-md"
            />
          )}
        </div>
      ))}
    </section>
  );
};

export default CardContainer;
