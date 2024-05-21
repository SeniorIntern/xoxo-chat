import { logout } from '@/action';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';

const Logout = async () => {
  return (
    <form
      action={async () => {
        'use server';
        await logout();
        redirect('/login');
      }}
      className="w-full p-0 inline-flex gap-2"
    >
        <LogOut color="white" size={34} className="rounded-full bg-muted p-2" />
      <button className="w-full text-left font-semibold text-white">
        Logout
      </button>
    </form>
  );
};

export default Logout;
