import NavOptions from '@/app/NavOptions';
import UserNav from '@/app/UserNav';

const Header = () => {
  return (
    <nav className="flex h-[var(--bar-height)] items-center justify-between border-b bg-secondary px-4 py-2">
      <NavOptions />
      <UserNav />
    </nav>
  );
};

export default Header;
