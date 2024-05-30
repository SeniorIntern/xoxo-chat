import TweetAside from './TweetAside';

export default function TweetLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex grow divide-x">
      <TweetAside />
      {children}
      <div className="w-[31%]"></div>
    </div>
  );
}
