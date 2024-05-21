'use client';

import filterPlayersByFriends from '@/helpers/filterPlayersByFriend';
import useFriends from '@/hooks/useFriends';
import usePlayers from '@/hooks/usePlayers';

import PeopleSuggestionItem from './PeopleSuggestionItem';

const FriendSuggestions = () => {
  const { data: allPlayers } = usePlayers();
  const { data: friends } = useFriends();

  if (allPlayers && friends) {
    const players = filterPlayersByFriends(allPlayers, friends);

    return (
      <div className="flex gap-4 overflow-scroll">
        {players.map((p) => (
          <PeopleSuggestionItem key={p._id} user={p} />
        ))}
      </div>
    );
  }
};

export default FriendSuggestions;
