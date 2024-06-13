'use client';

import useGameStore from '@/app/store/gameStore';

import RestartGame from './RestartGame';

const GameControls = () => {
  const totalUniqueCards = 9;
  const { pairs } = useGameStore();

  return (
    <div className="my-8">
      <div className="flex items-center justify-between">
        <span className="text-xl italic uppercase font-bold">
          SCORE: {`${pairs.length}/${totalUniqueCards}`}
        </span>
        <RestartGame />
      </div>
    </div>
  );
};

export default GameControls;
