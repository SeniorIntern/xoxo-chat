import Image from 'next/image';
import ChatSvg from './chat.svg';

export default function Page() {
  return (
    <section className="flex grow items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-28 w-28">
          <Image
            src={ChatSvg}
            alt="profile image"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <p className="text-xl font-bold text-gray-400">No chats selected</p>
      </div>
    </section>
  );
}
