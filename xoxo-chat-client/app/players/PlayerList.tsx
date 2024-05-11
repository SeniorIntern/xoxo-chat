'use client';

import UserListItem from '@/app/chat/UserListItem';
import { Button } from '@/components/ui/button';
import usePlayers from '@/hooks/usePlayers';
import classNames from 'classnames';
import Link from 'next/link';
import usePlayerStore from '../store/playerStore';

const PlayerList = () => {
  const { data: players, isLoading, error } = usePlayers();
  const { player, setPlayer } = usePlayerStore();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div className="space-y-4">
      {players?.map((p) => (
        <Link
          href={`/players/${p._id}`}
          onClick={() => setPlayer(p)}
          className={classNames(
            'block',
            {
              'bg-[var(--conversation-active)]': player?._id === p._id
            },
            'cursor-pointer rounded-md p-2 hover:bg-[var(--secondary-gray)]'
          )}
          key={p._id}
        >
          <UserListItem userData={{ type: 'player', data: p }}>
            <div className="space-x-2">
              <Button className="bg-[var(--prime)] px-6 hover:bg-[var(--prime-hover)]">
                Add Friend
              </Button>
              <Button className="bg-[var(--secondary-gray)] px-6 hover:bg-[var(--secondary-gray-hover)]">
                Remove
              </Button>
            </div>
          </UserListItem>
        </Link>
      ))}
    </div>
  );
};

export default PlayerList;
