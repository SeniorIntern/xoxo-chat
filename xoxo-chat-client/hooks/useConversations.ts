import { Conversation } from '@/app/types';
import { CACHE_KEY_CONVERSATIONS } from '@/constants';
import { conversationService } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useConversations = (id: string) => {
  return useQuery<Conversation[], Error>({
    queryKey: [CACHE_KEY_CONVERSATIONS, id],
    queryFn: () => conversationService.getAllWithId(id),
    refetchOnMount: 'always'
  });
};

export default useConversations;
