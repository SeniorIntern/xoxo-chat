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
import { CACHE_KEY_PLAYER, TOAST_KEY_ANNOUNCE } from '@/constants';
import apiClient from '@/services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, ReactNode, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

type Props = {
  title: string;
  type: 'profile' | 'cover';
  userId: string;
  children: ReactNode;
};

const ImageUploadDialog = ({ title, type, userId, children }: Props) => {
  console.log('mounted');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const resourceName = type === 'profile' ? 'profileImage' : 'coverImage';

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      apiClient
        .patch<Player>('/users/' + resourceName, formData)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_PLAYER, userId]
      });
      toast.success('Image is updated', {
        id: TOAST_KEY_ANNOUNCE,
        duration: 8000
      });
    },
    onError: (err) => {
      toast.error(err.message, { id: TOAST_KEY_ANNOUNCE, duration: 8000 });
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
      mutation.mutate(formData);
      setIsSubmitting(false);
      setIsDialogOpen(false);
      toast.success('Image is updated', { id: TOAST_KEY_ANNOUNCE });
    } catch (err: unknown) {
      setIsSubmitting(false);
      setIsDialogOpen(false);
      if (err instanceof Error)
        toast.error(err.message, { id: TOAST_KEY_ANNOUNCE });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="text-blue-600">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div {...getRootProps()} className="">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="cursor-pointer rounded-md border-2 border-dashed border-muted px-4 py-8">
                <p className="border-mutedtext">
                  {type === 'profile'
                    ? 'Drag & drop profile picture here, or click to select image'
                    : type === 'cover'
                      ? 'Drag & drop cover photo here, or click to select image'
                      : 'Drag &apos;n&apos; drop some files here, or click to select files'}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="sm:justify-end">
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Submitting' : 'Save'}
            </Button>
            <DialogClose asChild>
              <Button
                disabled={isSubmitting}
                type="button"
                variant="destructive"
              >
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
