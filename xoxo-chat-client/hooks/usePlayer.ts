import { Player } from '@/app/types';
import { CACHE_KEY_PLAYERS } from '@/constants';
import playerService from '@/services/playerService';
import { useQuery } from '@tanstack/react-query';

const usePlayer = (id: string) => {
  return useQuery<Player, Error>({
    queryKey: [CACHE_KEY_PLAYERS, id],
    queryFn: () => playerService.getById(id),
    staleTime: 1 * 60 * 1000
  });
};

export default usePlayer;
