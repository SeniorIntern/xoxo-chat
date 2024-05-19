'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import useMe from '@/hooks/useMe';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Image from 'next/image';

import ImageUploadDialog from './ImageUploadDialog';
import ProfileIntro from './ProfileIntro';

const ProfileEditDialog = () => {
  const { data: user, isLoading, error } = useMe();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-md bg-primary p-2 px-4 text-white">
          <Pencil size={18} />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md border-none">
        <ScrollArea type="scroll" style={{ maxHeight: 'calc(100vh - 168px)' }}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-white">
              Edit Profile
            </DialogTitle>
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">Profile picture</span>
                  <ImageUploadDialog
                    title="Drop/Upload profile picture"
                    type="profile"
                  />
                </div>

                <div className="relative mx-auto h-44 w-44">
                  <Image
                    src={
                      user?.profileImage
                        ? user.profileImage
                        : 'https://picsum.photos/id/40/4106/2806'
                    }
                    alt="profile image"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">Cover image</span>
                  <ImageUploadDialog
                    title="Drop/Upload cover photo"
                    type="cover"
                  />
                </div>
                <div className="relative mx-auto h-44 w-3/4">
                  <Image
                    src={
                      user?.coverImage
                        ? user.coverImage
                        : 'https://picsum.photos/id/40/4106/2806'
                    }
                    alt="cover photo"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                </div>
              </div>
              <ProfileIntro />
            </div>
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
