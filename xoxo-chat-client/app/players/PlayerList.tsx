'use client';

import UserListItem from '@/app/chat/UserListItem';
import usePlayers from '@/hooks/usePlayers';

const PlayerList = () => {
  const { data: players, isLoading, error } = usePlayers();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  console.log('players=', players);

  return (
    <div className="space-y-4">
      {players?.map((player) => (
        <UserListItem
          userData={{ type: 'player', data: player }}
          key={player._id}
        />
      ))}
    </div>
  );
};

export default PlayerList;
