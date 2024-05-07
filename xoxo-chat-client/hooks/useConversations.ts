import { CACHE_KEY_CONVERSATIONS } from '@/constants';
import conversationService, {
  Conversation
} from '@/services/conversationService';
import { useQuery } from '@tanstack/react-query';

const useConversations = (id: string) => {
  return useQuery<Conversation[], Error>({
    queryKey: [CACHE_KEY_CONVERSATIONS, id],
    queryFn: () => conversationService.getAllWithId(id),
    staleTime: 10 * 1000
  });
};

export default useConversations;
