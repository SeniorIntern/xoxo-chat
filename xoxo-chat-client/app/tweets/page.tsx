import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Images, Laugh, Video } from 'lucide-react';
import Image from 'next/image';

export default function page() {
  return (
    <>
      <section className="w-[24%] space-y-4 p-4"></section>

      <section className="flex grow flex-col overflow-y-scroll bg-secondary">
        <form className="flex items-center gap-2 bg-secondary p-2">
          <div className="relative h-10 w-10">
            <Image
              src={'https://picsum.photos/id/40/4106/2806'}
              alt="profile image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>

          <Input
            className="w-full rounded-3xl border-none bg-muted px-4 py-2 text-white"
            placeholder="What's on your mind, Nikhil?"
          />
        </form>
        <Separator />

        <div className="flex justify-between bg-secondary px-8 py-4">
          <div className="inline-flex gap-2">
            <Video color="red" />
            <span className="text-mutedtext">Video</span>
          </div>

          <div className="inline-flex gap-2">
            <Images color="green" />
            <span className="text-mutedtext">Photo</span>
          </div>

          <div className="inline-flex gap-2">
            <Laugh color="yellow" />
            <span className="text-mutedtext">Feeling/activity</span>
          </div>
        </div>
      </section>
    </>
  );
}
