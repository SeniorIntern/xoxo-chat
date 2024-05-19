'use client';

import UserListItem from '@/app/chat/UserListItem';
import { Button } from '@/components/ui/button';
import { CACHE_KEY_PLAYERS } from '@/constants';
import usePlayers from '@/hooks/usePlayers';
import apiClient from '@/services/apiClient';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { toast } from 'sonner';
import { Player } from '@/app/types';

const PlayerList = () => {
  const endpoint = 'http://localhost:3001/api/v1/users';
  const queryClient = useQueryClient();

  const patchUser = useMutation({
    //@ts-ignore
    mutationFn: (friendId: string) => {
      apiClient.patch<Player>(endpoint, { friendId }).then((res) => res.data);
    },
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

  const { data: players, isLoading, error } = usePlayers();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div className="space-y-4">
      {players?.map((p) => (
        <div className="block cursor-pointer rounded-md p-2" key={p._id}>
          <UserListItem userData={{ type: 'player', data: p }}>
            <div className="flex space-x-2">
              <Button onClick={() => patchUser.mutate(p._id)} className="px-6">
                Add Friend
              </Button>
              <Button className="px-6" asChild>
                <Link href={`/players/${p._id}`}>Visit Profile</Link>
              </Button>
            </div>
          </UserListItem>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
