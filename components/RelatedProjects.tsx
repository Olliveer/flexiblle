import { getUserProjects } from '@/lib/actions';
import { ProjectInterface, UserProfile } from '@/model/global';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

type RelatedProjectsProps = {
  userId: string;
  projectId: string;
};

async function RelatedProjects({ userId, projectId }: RelatedProjectsProps) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from('projects')
    .select('*, profiles(*)')
    .eq('user_id', userId)
    .limit(3);

  const filteredProjects = data?.filter(
    (project: ProjectInterface) => project.id !== projectId
  );

  if (filteredProjects?.length === 0) return null;

  if (error) {
    console.log(error);
    return null;
  }

  if (!data) {
    return notFound();
  }

  return (
    <section className="mt-32 flex w-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-base font-bold">
          More by {session?.user?.user_metadata?.full_name}
        </p>

        <Link
          href={`/profile/${userId}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="mt-5 grid w-full grid-cols-1  gap-4  sm:grid-cols-2 md:grid-cols-3">
        {filteredProjects?.map((data: ProjectInterface) => (
          <div className="flex min-h-[197px] min-w-[210px] flex-col items-center justify-center rounded-2xl shadow-sm">
            <Link
              href={`/project/${data.id}`}
              key={data.id}
              className="flexCenter group relative h-full w-full"
            >
              <Image
                src={data.image}
                alt={data.title}
                width={414}
                height={214}
                className="h-full w-full rounded-2xl object-cover"
              />

              <div className="absolute bottom-0 right-0 hidden h-1/3 w-full items-end justify-end gap-2 rounded-b-2xl bg-gradient-to-b from-transparent to-black/50 p-4 text-lg font-semibold text-white group-hover:flex">
                <p className="w-full">{data.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RelatedProjects;
