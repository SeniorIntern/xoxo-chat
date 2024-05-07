'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

import Image from 'next/image';
import Link from 'next/link';

import { signup } from '@/action';
import { useRouter } from 'next/navigation';
import bannerImage from './banner.avif';

const FormSchema = z.object({
  username: z.string().min(3, {
    message: 'Username must be atleast 3 characters long'
  }),
  email: z.string().email(),
  password: z.string().min(7, {
    message: 'Password must be atleast 7 characters long'
  })
});

export type RegisterData = z.infer<typeof FormSchema>;

export default function Page() {
  const router = useRouter();

  async function clientAction(formData: RegisterData) {
    const result = await signup(formData);
    if (result?.status) {
      toast({
        title: 'Signup Sucessful!'
      });
      router.push('/');
    } else {
      toast({ title: result?.data });
    }
  }

  const form = useForm<RegisterData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    clientAction(data);
  }

  return (
    <div className="h-full w-full grow lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance">
              Enter your email below to login to your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Enter Your Username
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Aa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Enter Your Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="dan@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Enter Your Password
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="*******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-white text-black hover:bg-white hover:text-black"
              >
                Submit
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm text-white">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              LogIn
            </Link>
          </div>
        </div>
      </div>

      <div className="relative hidden h-full w-full bg-muted lg:block">
        <Image
          src={bannerImage}
          alt="Banner image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}