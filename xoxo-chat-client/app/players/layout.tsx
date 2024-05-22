import PlayerList from './PlayerList';

export default async function PlayerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex grow divide-x">
      <section className="w-[28%] space-y-8 p-2">
        <p className="text-center text-xl font-bold">Friend Suggestions</p>
        <p>People you may know</p>
        <PlayerList />
      </section>
      {children}
    </div>
  );
}
