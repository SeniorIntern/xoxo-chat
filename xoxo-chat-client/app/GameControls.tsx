'use client';

import RestartGame from './RestartGame';
import useGameStore from './store/gameStore';

const GameControls = () => {
  const totalUniqueCards = 9;
  const fullScore = 2 * totalUniqueCards;
  const { pairs } = useGameStore();

  return (
    <div className="fixed top-20 w-full px-2">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">
          SCORE: {`${pairs.length}/${fullScore}`}
        </span>
        <RestartGame />
      </div>
    </div>
  );
};

export default GameControls;
