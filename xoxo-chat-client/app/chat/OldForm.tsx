

import { TOAST_KEY_ANNOUNCE } from '@/constants';
import { apiClient } from '@/services';
import { toast } from 'sonner';
type Props = {
  userId: string;
};

const OldForm = ({ userId }: Props) => {

  const handleSubmit = async () => {
    console.log('groupMembers===', groupMembers);
    groupMembers.push(userId);

  };

  return (
  );
};

export default OldForm;
