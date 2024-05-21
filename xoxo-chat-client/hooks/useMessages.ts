import { Message } from '@/app/types';
import { CACHE_KEY_MESSAGES } from '@/constants';
import messageService from '@/services/messageService';
import { useQuery } from '@tanstack/react-query';

const useMessages = (id: string) => {
  return useQuery<Message[], Error>({
    queryKey: [CACHE_KEY_MESSAGES, id],
    queryFn: () => messageService.getAllWithId(id),
    staleTime: 1 * 60 * 1000,
    refetchOnMount: 'always'
  });
};

export default useMessages;
