'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useState } from 'react';

import { PlayerIntro } from '../types';
import ProfileBioForm from './ProfileBioForm';

type Props = {
  userIntro?: PlayerIntro;
};

const ProfileBioEditDialog = ({ userIntro }: Props) => {
  console.log('mounted');

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="muted" className="w-full">
          Edit Bio
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Fill your information
          </DialogTitle>
        </DialogHeader>
        <ProfileBioForm userIntro={userIntro} openBioDialog={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileBioEditDialog;
