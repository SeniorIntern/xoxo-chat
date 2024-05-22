'use client';

import { sendMessage } from '@/action';
import useSocket from '@/app/store/socketStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import EmojiPicker from 'emoji-picker-react';
import { Image, SendHorizontal, SmilePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';

type Props = {
  sender: string;
  conversationId: string;
};

const MessageForm = ({ conversationId, sender }: Props) => {
  console.log('mounted');

  const { socket } = useSocket();
  const router = useRouter();
  const messageRef = useRef<HTMLInputElement>(null);

  async function clientAction() {
    if (!messageRef.current?.value.trim()) {
      return;
    }

    // TODO
    if (!sender) {
      router.push('/login');
      return;
    }

    const payload = {
      conversationId,
      sender,
      text: messageRef.current?.value
    };

    const result = await sendMessage(payload);

    if (result?.status) {
      messageRef.current.value = '';
      socket.emit('send', { ...payload, updatedAt: Date.now() });
    } else {
      toast.error(result?.data, { id: 'announcement' });
    }
  }

  return (
    <form
      className="flex grow space-x-4"
      onSubmit={(e) => {
        e.preventDefault();
        clientAction();
      }}
    >
      <Button variant="ghost" className="p-0">
        <Image color="#0084FF" />
      </Button>

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
      <Button variant="ghost" className="-rotate-90 p-0">
        <SendHorizontal color="#0084FF" className="font-bold" />
      </Button>
    </form>
  );
};

export default MessageForm;
