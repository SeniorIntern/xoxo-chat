'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CACHE_KEY_ME } from '@/constants';
import apiClient from '@/services/apiClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Pen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Player } from '../types';
import { useState } from 'react';

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.'
    })
    .max(260, {
      message: 'Bio must not be longer than 400 characters.'
    })
});

type Props = {
  about?: string;
};

const ProfileAboutEditDialog = ({ about }: Props) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const endpoint = 'http://localhost:3001/api/v1/users/about';

  const patchBio = useMutation({
    //@ts-ignore
    mutationFn: (formData: z.infer<typeof formSchema>) => {
      apiClient.patch<Player>(endpoint, formData).then((res) => res.data);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_ME
      });
      toast.success('Your information is updated', { id: 'announcement' });
    }
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bio: about ? about : ''
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('values=', data);
    toast.success('Your bio is updated', { id: 'announcement' });
    patchBio.mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer text-primary">Edit</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a short introduction about yourself</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Submit</Button>
                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileAboutEditDialog;
