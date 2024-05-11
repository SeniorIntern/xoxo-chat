import Image from 'next/image';

const UserInfo = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative h-32 w-32">
        <Image
          src={'https://picsum.photos/id/40/4106/2806'}
          alt="profile image"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-full"
        />
      </div>
      <span className="text-xl font-semibold">John Wick</span>
    </div>
  );
};

export default UserInfo;
