import { Conversation } from '@/app/types';
import { CACHE_KEY_CONVERSATIONS } from '@/constants';
import conversationService from '@/services/conversationService';
import { useQuery } from '@tanstack/react-query';

const useConversations = (id: string) => {
  return useQuery<Conversation[], Error>({
    queryKey: [CACHE_KEY_CONVERSATIONS, id],
    queryFn: () => conversationService.getAllWithId(id),
    staleTime: 1 * 60 * 1000,
    refetchOnMount: 'always'
  });
};

export default useConversations;
