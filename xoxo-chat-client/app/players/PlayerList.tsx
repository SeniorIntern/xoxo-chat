'use client';

import UserListItem from '@/app/chat/UserListItem';
import { Player } from '@/app/types';
import { Button } from '@/components/ui/button';
import { CACHE_KEY_PLAYERS } from '@/constants';
import filterPlayersByFriends from '@/helpers/filterPlayersByFriend';
import { useFriends, usePlayers } from '@/hooks';
import apiClient from '@/services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { toast } from 'sonner';

const PlayerList = () => {
  const queryClient = useQueryClient();
  console.log('mounted');

  const patchUser = useMutation({
    mutationFn: (friendId: string) =>
      apiClient.patch<Player>(endpoint, { friendId }).then((res) => res.data),
    onSuccess: () => {
      toast.success('Friend Added', { id: 'announcement' });
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_PLAYERS
      });
      // queryClient.setQueryData<Player>(CACHE_KEY_ME, (user) => user);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data, { id: 'announcement' });
      }
    }
  });

  const endpoint = 'http://localhost:3001/api/v1/users';
  const { data: allPlayers, isLoading: isPlayersLoading, error } = usePlayers();
  const { data: friends, isLoading: isFriendsLoading } = useFriends();

  if (isPlayersLoading || isFriendsLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  if (allPlayers && friends) {
    const players = filterPlayersByFriends(allPlayers, friends);

    return (
      <aside className="space-y-4">
        {players.map((p) => (
          <div className="block cursor-pointer rounded-md p-2" key={p._id}>
            <UserListItem userData={{ type: 'player', data: p }}>
              <div className="flex space-x-2">
                <Button
                  onClick={() => patchUser.mutate(p._id)}
                  className="px-6"
                >
                  Add Friend
                </Button>
                <Button className="px-6" asChild>
                  <Link href={`/players/${p._id}`}>Visit Profile</Link>
                </Button>
              </div>
            </UserListItem>
          </div>
        ))}
      </aside>
    );
  }
};

export default PlayerList;
