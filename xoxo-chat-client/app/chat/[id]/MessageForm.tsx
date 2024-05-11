'use client';

import { sendMessage } from '@/action';
import useSocket from '@/app/store/socketStore';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import SendSvg from './send.svg';

type Props = {
  sender: string | undefined;
  conversationId: string;
};

const MessageForm = ({ conversationId, sender }: Props) => {
  const { socket } = useSocket();
  const router = useRouter();
  const messageRef = useRef<HTMLInputElement>(null);

  async function clientAction() {
    if (!messageRef.current?.value.trim()) {
      return;
    }

    // if token is expired(due to very long idle time), senderId will be undefined
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
      toast({ title: result?.data, key: 'message' });
    }
  }

  return (
    <form
      className="flex grow"
      onSubmit={(e) => {
        e.preventDefault();
        clientAction();
      }}
    >
      <input
        ref={messageRef}
        className="w-full rounded-3xl border-none bg-[var(--secondary-gray)] px-4 py-2 text-white focus:outline-none"
        placeholder="Aa"
      />
      <Button variant="ghost" className="relative h-10 w-10">
        <Image
          src={SendSvg}
          alt="profile image"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-full"
        />
      </Button>
    </form>
  );
};

export default MessageForm;
