import { Message } from '@/app/types';
import { CACHE_KEY_CHATS } from '@/constants';
import chatService from '@/services/chatService';
import { useQuery } from '@tanstack/react-query';

const useChats = (id:string) => {
  return useQuery<Message[], Error>({
    queryKey: [CACHE_KEY_CHATS, id],
    queryFn: () => chatService.getAllWithId(id),
    staleTime: 10 * 1000
  });
};

export default useChats;
