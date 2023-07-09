import Categories from '@/components/Categories';
import LoadMore from '@/components/LoadMore';
import ProjectCard from '@/components/ProjectCard';
import { fecthAllProjects } from '@/lib/actions';
import type { ProjectInterface } from '@/model/global';
import {
  createClientComponentClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import { getPagination } from '@/lib/utils';

type HomeProps = {
  searchParams: {
    category?: string;
    page?: string;
  };
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default async function Home({
  searchParams: { category, page },
}: HomeProps) {
  const supabase = createServerComponentClient({ cookies });

  let query = supabase
    .from('projects')
    .select('*, profiles(*)')
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  query = query;

  const { data, error, count } = await query;

  console.log(data?.length);

  if (!data) {
    return (
      <section className="flex flex-col items-center justify-start px-5 py-6 lg:px-20">
        <Categories />

        <div className="flex h-[300px] w-full flex-col  items-center justify-center gap-4  ">
          <p className="text-center">
            No projects found, go create some first.
          </p>
          <Link
            href={'/'}
            className="text-md text-gray decoration-none rounded-md  px-4 py-2"
          >
            Go to home page
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-start mb-16 flex-col px-5 py-6 lg:px-20">
      <Categories />
      <section className="mt-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data?.map((project: ProjectInterface) => (
          <ProjectCard
            avatarUrl={project.profiles.avatar_url}
            key={project.id}
            image={project.image}
            name={project.profiles.full_name}
            title={project.title}
            userId={project.user_id}
            id={project.id}
          />
        ))}
      </section>

      {/* <LoadMore /> */}
    </section>
  );
}
