'use client';

import UserListItem from '@/app/chat/UserListItem';
import { Button } from '@/components/ui/button';
import usePlayers from '@/hooks/usePlayers';
import apiClient from '@/services/apiClient';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { toast } from 'sonner';

const PlayerList = () => {
  const { data: players, isLoading, error } = usePlayers();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  async function patchUser(friendId: string) {
    try {
      const res = await apiClient.patch('/users', { friendId });
      console.log('res=', res.data);
      toast.success('Friend Added', { id: 'announcement' });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data, { id: 'announcement' });
      }
    }
  }

  return (
    <div className="space-y-4">
      {players?.map((p) => (
        <div className="block cursor-pointer rounded-md p-2" key={p._id}>
          <UserListItem userData={{ type: 'player', data: p }}>
            <div className="flex space-x-2">
              <Button
                onClick={async () => await patchUser(p._id)}
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
    </div>
  );
};

export default PlayerList;
