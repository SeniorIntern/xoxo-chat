'use client';

import { Player } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { CACHE_KEY_ME } from '@/constants';
import apiClient from '@/services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

type Props = {
  title: string;
  type: 'profile' | 'cover';
};

const ImageUploadDialog = ({ title, type }: Props) => {
  const resourceName = type === 'profile' ? 'profileImage' : 'coverImage';
  const endpoint = 'http://localhost:3001/api/v1/users/' + resourceName;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const patchUser = useMutation({
    //@ts-ignore
    mutationFn: (formData: FormData) => {
      apiClient.patch<Player>(endpoint, formData).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_ME
      });

      // queryClient.setQueryData<Player>(CACHE_KEY_ME, (user) => user);
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.dir(acceptedFiles);

    if (acceptedFiles.length > 1) {
      return toast.error('You cannot select more than 1 file');
    }
    console.log('file=', acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();

    if (typeof acceptedFiles[0] === 'undefined') return;

    const formData = new FormData();
    formData.append(resourceName, acceptedFiles[0]);

    try {
      patchUser.mutate(formData);
      // await apiClient.patch(endpoint, formData);
      setIsSubmitting(false);
      setIsDialogOpen(false);
      toast.success('Image is updated', { id: 'announcement' });
    } catch (err: unknown) {
      setIsSubmitting(false);
      setIsDialogOpen(false);
      if (err instanceof Error)
        toast.error(err.message, { id: 'announcement' });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className="text-blue-600"
      >
        Edit
      </DialogTrigger>
      <DialogContent className="border-none">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>

          <DialogFooter className="sm:justify-end">
            <Button disabled={isSubmitting} type="submit" variant="secondary">
              {isSubmitting ? 'Submitting' : 'Save'}
            </Button>
            <DialogClose asChild>
              <Button disabled={isSubmitting} type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
