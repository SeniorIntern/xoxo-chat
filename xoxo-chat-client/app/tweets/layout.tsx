export default function TweetLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex grow divide-x">
      {children}
      <div className="w-[28%]"></div>
    </div>
  );
}
