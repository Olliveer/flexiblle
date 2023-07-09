'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { uploadImage } from '@/lib/actions';
import { isBase64DataURL } from '@/lib/utils';
import { Profile } from '@/model/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Edit, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from './ui/use-toast';

const formSchema = z.object({
  avatar_url: z.string().url(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  live_web_site: z.string().url(),
  github_url: z.string().url(),
  username: z.string().min(2).max(50),
});

type ProfileFormProps = {
  user: Profile;
};

function ProfileForm({ user }: ProfileFormProps) {
  const { toast } = useToast();
  const supabase = createClientComponentClient();
  const [avatar, setAvatar] = useState(user.avatar_url);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar_url: user.avatar_url,
      github_url: user.github_url,
      live_web_site: user.live_web_site,
      name: user.full_name,
      email: user.email,
      username: user.username,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const isUploadingNewImage = isBase64DataURL(avatar);

    if (isUploadingNewImage) {
      const imageUrl = await uploadImage(avatar);

      if (imageUrl.url) {
        values.avatar_url = imageUrl.url;
      }
    }

    try {
      const { error, status } = await supabase
        .from('profiles')
        .update({
          avatar_url: values.avatar_url,
          github_url: values.github_url,
          live_web_site: values.live_web_site,
          full_name: values.name,
          email: values.email,
          username: values.username,
        })
        .eq('id', user.id);

      if (error) {
        console.error(error);
        throw error;
      }
      console.log(status);
      if (status === 204) {
        return toast({
          title: 'Profile updated',
          description: 'Your profile has been updated.',
          variant: 'default',
          // action: <ToastAction altText="Profile updated ">Undo</ToastAction>,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChangeImage(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      setAvatar(result);
    };
  }

  return (
    <div className="flex w-full flex-col justify-center space-x-0 md:flex-row md:space-x-5">
      <div className="group relative mx-10 flex w-40 items-start justify-center">
        <Image
          src={avatar}
          width={150}
          height={150}
          className=" rounded-full shadow-sm"
          alt="user image"
        />
        <label
          htmlFor="avatar_update"
          className=" absolute right-0 top-0 hidden rounded border border-black/10 bg-white p-2 shadow-sm group-hover:flex"
        >
          <Edit className="h-4 w-4" />
        </label>
        <Input
          id={'avatar_update'}
          className="hidden"
          type="file"
          onChange={handleChangeImage}
        />
      </div>
      <div className="flex w-full justify-start ">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="github_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="live_web_site"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Site</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center justify-end">
                <Button type="submit">
                  {form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4" />
                  ) : null}
                  {form.formState.isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
