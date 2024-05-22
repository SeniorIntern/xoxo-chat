import getConversationMember from '@/app/chat/getConversationMember';
import { ConversationData, PlayerData } from '@/app/types';

const getProfileImage = (userData: PlayerData | ConversationData): string => {
  if (userData.type === 'conversation') {
    const member = getConversationMember(
      userData.data.members,
      userData.userId
    );
    return member.profileImage;
  } else {
    return userData.data.profileImage;
  }
};

export default getProfileImage;
