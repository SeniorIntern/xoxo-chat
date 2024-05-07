import PeopleSvg from '@/app/people.svg';
import Image from 'next/image';
import PlayerList from './PlayerList';

export default async function Page() {
  return (
    <main className="flex grow divide-x divide-[var(--secondary-gray)]">
      <section className="w-[28%] space-y-8 p-4">
        <p className="text-center text-xl font-bold">Friend Suggestions</p>
        <p>People you may know</p>
        <PlayerList />
      </section>

      <section className="flex grow items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative h-28 w-28">
            <Image
              src={PeopleSvg}
              alt="profile image"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className="text-xl font-bold text-gray-400">
            Select people's names to preview their profile.
          </p>
        </div>
      </section>
    </main>
  );
}
