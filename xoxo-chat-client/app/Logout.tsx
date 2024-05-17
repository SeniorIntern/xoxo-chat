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
      className='w-full p-0'
    >
      <button className='w-full text-left'>Logout</button>
    </form>
  );
};

export default Logout;
