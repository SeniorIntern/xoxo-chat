'use client';

import { Player } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TOAST_KEY_ANNOUNCE } from '@/constants';
import { usePlayerFriends } from '@/hooks';
import { apiClient } from '@/services';
import { UsersRound } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import UserListItem from './UserListItem';

type Props = {
  userId: string;
};

const ChatCreateGroupDialog = ({ userId }: Props) => {
  const { data: friends, isLoading, error } = usePlayerFriends(userId);
  const [searchResult, setSearchResult] = useState<Player[] | undefined>();

  const [groupMembers, setGroupMembers] = useState<String[]>([]);
  const [open, setOpen] = useState(false);

  const handleAdd = (playerId: string) => {
    setGroupMembers((prev) => [...prev, playerId]);
  };

  const handleRemove = (playerId: string) => {
    setGroupMembers((prev) => prev.filter((p) => p !== playerId));
  };

  const handleSearch = (input: string) => {
    const results = friends?.filter((friend) =>
      friend.username.includes(input)
    );
    setSearchResult(results);
  };

  const handleSubmit = async () => {
    console.log('groupMembers===', groupMembers);
    groupMembers.push(userId);
    const groupIds = groupMembers;

    try {
      const res = await apiClient.post('/conversations', { groupIds });
      toast.success('Group is created', { id: TOAST_KEY_ANNOUNCE });

      setGroupMembers([]);
      setOpen(false);
    } catch (err: unknown) {
      console.log('error===', err);
      toast.success('Group failed to create', { id: TOAST_KEY_ANNOUNCE });

      setGroupMembers([]);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <UsersRound size={20} />
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Create Chat Group</DialogTitle>

          <DialogDescription>
            Add members to include in the Chat Group;
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Search for friend</Label>
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              id="username"
              placeholder="John Smith"
            />
          </div>

          <ScrollArea className="h-[300px] w-full rounded-md py-2">
            <div className="space-y-2">
              <span className="text-sm text-mutedtext">Search Results:</span>
              <div className="flex flex-col gap-2">
                {searchResult &&
                  searchResult.length > 0 &&
                  searchResult.map((friend, i) => (
                    <div className="flex items-center justify-between" key={i}>
                      <UserListItem
                        userData={{ type: 'player', data: friend }}
                      />
                      {groupMembers.includes(friend._id) ? (
                        <Button
                          onClick={() => handleRemove(friend._id)}
                          className="px-6"
                          variant="destructive"
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAdd(friend._id)}
                          className="px-6"
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  ))}
              </div>

              <div className="flex flex-col gap-2">
                {!searchResult &&
                  friends &&
                  friends.map((friend) => (
                    <div
                      className="flex items-center justify-between"
                      key={friend._id}
                    >
                      <UserListItem
                        userData={{ type: 'player', data: friend }}
                      />
                      {groupMembers.includes(friend._id) ? (
                        <Button
                          onClick={() => handleRemove(friend._id)}
                          className="px-6"
                          variant="destructive"
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAdd(friend._id)}
                          className="px-6"
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button
            disabled={groupMembers.length === 0}
            type="button"
            onClick={handleSubmit}
          >
            Create
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatCreateGroupDialog;
