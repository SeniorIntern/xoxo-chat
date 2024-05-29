import { Like } from '@/app/types';

const isLikedAlready = (likes: Like[], userId: string): boolean => {
  return likes.some((like) => like.userId === userId);
};

export default isLikedAlready;
