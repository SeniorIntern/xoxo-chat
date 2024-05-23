'use client';

import useSocket from '@/app/store/socketStore';
import { Message } from '@/app/types';
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
import { Image, SendHorizontal, SmilePlus } from 'lucide-react';
import { FormEvent, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

type Props = {
  sender: string;
  conversationId: string;
};

const MessageForm = ({ conversationId, sender }: Props) => {
  const { socket } = useSocket();
  const messageRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      apiClient.post<Message>('/messages', formData).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_CONVERSATIONS, conversationId]
      });

      socket.emit('send', {
        ...{
          conversationId,
          sender,
          text: messageRef.current?.value,
          attachmentUrls: data.attachmentUrls
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.dir(acceptedFiles);
    console.log('onDrop files=', acceptedFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (messageRef.current?.value.trim() || acceptedFiles.length !== 0) {
      console.log('acceptedFiles=', acceptedFiles);

      const formData = new FormData();
      // Iterate over the acceptedFiles array and append each file to the FormData object
      acceptedFiles.forEach((file) => {
        formData.append('attachmentUrls', file, file.name);
      });
      acceptedFiles.length = 0;

      formData.append('conversationId', conversationId);
      formData.append('sender', sender);

      if (messageRef.current?.value.trim()) {
        formData.append('text', messageRef.current.value);
      }

      try {
        console.log('formdata===', formData);
        mutation.mutate(formData);
      } catch (err: unknown) {
        if (err instanceof Error)
          toast.error(err.message, { id: 'announcement' });
      }
    }
  };

  console.log('mounted');

  return (
    <div className='flex grow flex-col'>
      {acceptedFiles.length != 0 && (
        <p className="text-xs">{acceptedFiles.length} images</p>
      )}
      <form
        className="flex grow items-center space-x-4"
        onSubmit={handleSubmit}
      >
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
    </div>
  );
};

export default MessageForm;
