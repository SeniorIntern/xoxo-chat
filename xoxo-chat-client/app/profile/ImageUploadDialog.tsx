'use client';

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
import apiClient from '@/services/apiClient';
import { FormEvent, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

type Props = {
  title: string;
  type: 'profile' | 'cover';
};

const ImageUploadDialog = ({ title, type }: Props) => {
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
    e.preventDefault();

    if (typeof acceptedFiles[0] === 'undefined') return;

    const formData = new FormData();

    formData.append('profileImage', acceptedFiles[0]);

    try {
      const results = await apiClient.patch(
        'http://localhost:3001/api/v1/users/profileImage',
        formData
      );
      console.log('results', results);
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-blue-600">Edit</DialogTrigger>
      <DialogContent className="border-none bg-[var(--primary-gray)]">
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
            <Button type="submit" variant="secondary">
              Save
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
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
