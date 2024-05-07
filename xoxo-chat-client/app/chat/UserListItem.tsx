import { Conversation } from '@/services/conversationService';
import { Player } from '@/services/playerService';
import Image from 'next/image';
import getConversationMember from './getConversationMember';

type PlayerData = {
  type: 'player';
  data: Player;
};

type ConversationData = {
  type: 'conversation';
  data: Conversation;
  userId: string;
};

type Props = {
  userData: PlayerData | ConversationData;
};

const UserListItem = ({ userData }: Props) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative h-10 w-10">
        <Image
          src={'https://picsum.photos/id/40/4106/2806'}
          alt="profile image"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-full"
        />
      </div>
      <div className="space-y-2">
        {userData.type === 'conversation' && (
          <p>
            {
              getConversationMember(userData.data.members, userData.userId)
                .username
            }
          </p>
        )}
        {userData.type === 'player' && <p>{userData.data.username}</p>}
      </div>
    </div>
  );
};

export default UserListItem;
