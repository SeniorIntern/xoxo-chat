import { logout } from '@/action';
import { redirect } from 'next/navigation';

const Logout = async () => {
  return (
    <form
      action={async () => {
        'use server';
        await logout();
        redirect('/login');
      }}
    >
      <button>Logout</button>
    </form>
  );
};

export default Logout;
