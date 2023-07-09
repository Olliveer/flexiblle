import Image from 'next/image';

import type { Profile } from '@/model/global';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Edit, Mail, PlusCircle } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { Button } from './ui/button';

type Props = {
  user: Profile;
};

export default async function ProfilePage({ user }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <section className="max-w-10xl mx-auto flex w-full flex-col items-center justify-center px-5 py-6 lg:px-20">
      {session ? (
        <div className="max-w-10xl mx-auto my-2 flex w-full justify-end gap-2 ">
          <Link href={`/profile/${user?.id}/edit`}>
            <Button variant={'ghost'}>
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </Link>
        </div>
      ) : null}
      <section className="flex w-full items-center justify-center gap-10 max-lg:flex-col md:justify-between">
        <div className="flex w-full flex-col items-center md:items-start">
          <Image
            src={user?.avatar_url}
            width={100}
            height={100}
            className="rounded-full"
            alt="user image"
          />
          <span className="mt-10 text-4xl font-bold">{user?.full_name}</span>
          <span className="mt-5 max-w-xl text-3xl font-extrabold md:mt-10 md:text-5xl">
            I’m Software Engineer 👋
          </span>

          <div className="mt-8 flex w-full flex-wrap gap-5">
            <Button variant={'link'}>
              <PlusCircle className="mr-2 h-4 w-4" /> Follow
            </Button>
            <Link href={`mailto:${user?.email}`}>
              <Button variant={'link'}>
                <Mail className="mr-2 h-4 w-4" /> Contact
              </Button>
            </Link>
          </div>
        </div>

        {user?.projects ? (
          <Image
            src={user?.projects[0]?.image}
            alt="project image"
            width={739}
            height={554}
            className="rounded-xl object-contain"
          />
        ) : (
          <Image
            src="/profile-post.png"
            width={739}
            height={554}
            alt="project image"
            className="rounded-xl"
          />
        )}
      </section>

      <section className="flelx mt-16 w-full flex-col items-center justify-start lg:mt-28">
        <p className="w-full text-left text-lg font-semibold">Recent Work</p>

        <div className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {user?.projects?.map((project) => (
            <ProjectCard
              key={`${project?.id}`}
              id={project?.id}
              image={project?.image}
              title={project?.title}
              name={user.full_name}
              avatarUrl={user.avatar_url}
              userId={user.id}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
