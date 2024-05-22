'use client';

import useSocket from '@/app/store/socketStore';
import { MessageRequest } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { CACHE_KEY_CONVERSATIONS } from '@/constants';
import apiClient from '@/services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EmojiPicker from 'emoji-picker-react';
import { SendHorizontal, SmilePlus } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';

type Props = {
  sender: string;
  conversationId: string;
};

const MessageForm = ({ conversationId, sender }: Props) => {
  console.log('mounted');

  const { socket } = useSocket();
  const messageRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: MessageRequest) =>
      apiClient.post('/messages', payload).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_CONVERSATIONS, conversationId]
      });

      socket.emit('send', {
        ...{
          conversationId,
          sender,
          text: messageRef.current?.value
        },
        updatedAt: Date.now()
      });

      if (!messageRef.current?.value.trim()) {
        return;
      }
      messageRef.current.value = '';
    },
    onError: (err) => {
      toast.error(err.message, { id: 'announcement' });
    }
  });

  return (
    <form
      className="flex grow space-x-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!messageRef.current?.value.trim()) {
          return;
        }

        const payload = {
          conversationId,
          sender,
          text: messageRef.current?.value
        };
        mutation.mutate(payload);
      }}
    >
      {/*
      <div {...getRootProps()} className="flex items-center">
        <input
          {...getInputProps()}
          type="file"
          id="attachments"
          accept="image/*"
          multiple
          size={2}
          className="hidden"
        />
        <label htmlFor="attachments">
          <Image color="#0084FF" />
        </label>
      </div>
*/}
      <Popover>
        <PopoverTrigger>
          <SmilePlus color="#0084FF" />
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0" align="start">
          <EmojiPicker
            onEmojiClick={(foo) => {
              if (messageRef.current) messageRef.current.value += foo.emoji;
            }}
          />
        </PopoverContent>
      </Popover>

      <Input
        ref={messageRef}
        className="w-full rounded-3xl border-none bg-muted px-4 py-2 text-white"
        placeholder="Aa"
      />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="-rotate-90 p-0">
              <SendHorizontal color="#0084FF" className="font-bold" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send Message</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
};

export default MessageForm;
