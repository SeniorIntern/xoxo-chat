import { Player } from '@/app/types';
import { CACHE_KEY_FRIENDS } from '@/constants';
import friendService from '@/services/friendService';
import { useQuery } from '@tanstack/react-query';

const useFriends = () => {
  return useQuery<Player[], Error>({
    queryKey: CACHE_KEY_FRIENDS,
    queryFn: friendService.getAll,
    staleTime: 1 * 60 * 1000
  });
};

export default useFriends;
