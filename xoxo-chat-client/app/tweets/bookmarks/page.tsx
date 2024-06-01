'use client';

import { useMe } from '@/hooks';

import BookmarksContainer from './BookmarksContainer';

export default function Page() {
  const { data: user } = useMe();

  return <>{user && <BookmarksContainer userId={user._id} />}</>;
}
