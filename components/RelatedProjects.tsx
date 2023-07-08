import { getUserProjects } from '@/lib/actions';
import { ProjectInterface, UserProfile } from '@/model/global';
import Image from 'next/image';
import Link from 'next/link';

type RelatedProjectsProps = {
  userId: string;
  projectId: string;
};

async function RelatedProjects({ userId, projectId }: RelatedProjectsProps) {
  const result = (await getUserProjects(userId)) as {
    user?: UserProfile;
  };

  const filteredProjects = result?.user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node.id !== projectId
  );

  if (filteredProjects?.length === 0) return null;

  return (
    <section className="mt-32 flex w-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-base font-bold">More by {result.user?.name}</p>

        <Link
          href={`/profile/${result.user?.id}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="mt-5 grid w-full grid-cols-1  gap-4  sm:grid-cols-2 md:grid-cols-3">
        {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
          <div className="flex min-h-[197px] min-w-[210px] flex-col items-center justify-center rounded-2xl shadow-sm">
            <Link
              href={`/project/${node.id}`}
              key={node.id}
              className="flexCenter group relative h-full w-full"
            >
              <Image
                src={node.image}
                alt={node.title}
                width={414}
                height={214}
                className="h-full w-full rounded-2xl object-cover"
              />

              <div className="absolute bottom-0 right-0 hidden h-1/3 w-full items-end justify-end gap-2 rounded-b-2xl bg-gradient-to-b from-transparent to-black/50 p-4 text-lg font-semibold text-white group-hover:flex">
                <p className="w-full">{node.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RelatedProjects;
