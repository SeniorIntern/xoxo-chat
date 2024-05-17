import { Player } from '@/app/types';
import { CACHE_KEY_PLAYERS } from '@/constants';
import playerService from '@/services/playerService';
import { useQuery } from '@tanstack/react-query';

const usePlayers = () => {
  return useQuery<Player[], Error>({
    queryKey: CACHE_KEY_PLAYERS,
    queryFn: playerService.getAll,
    staleTime: 1 * 60 * 1000
  });
};

export default usePlayers;
