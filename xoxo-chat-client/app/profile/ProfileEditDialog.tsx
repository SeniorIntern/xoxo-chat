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
import { Pencil } from 'lucide-react';
import Image from 'next/image';

import ImageUploadDialog from './ImageUploadDialog';
import ProfileBio from './ProfileBio';

const ProfileEditDialog = () => {

  return (
    <Dialog>
      <DialogTrigger className="inline-flex space-x-2 rounded-md bg-[var(--prime)] p-2 px-4 text-white hover:bg-[var(--prime-hover)]">
        <Pencil />
        <span>Edit Profile</span>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md border-none bg-[var(--primary-gray)]">
        <ScrollArea type="scroll" style={{ maxHeight: 'calc(100vh - 168px)' }}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-white">
              Edit Profile
            </DialogTitle>
            <DialogDescription className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">Profile picture</span>
                  <ImageUploadDialog title="Upload cover photo" type="profile" />
                </div>

                <div className="relative mx-auto h-44 w-44">
                  <Image
                    src={'https://picsum.photos/id/40/4106/2806'}
                    alt="profile image"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">Cover photo</span>
                  <ImageUploadDialog title="Upload cover photo" type="cover" />
                </div>
                <div className="relative mx-auto h-44 w-3/4">
                  <Image
                    src={'https://picsum.photos/id/40/4106/2806'}
                    alt="profile image"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                </div>
              </div>
              <ProfileBio />
            </DialogDescription>
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
