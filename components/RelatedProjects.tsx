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
      <div className="flexBetween">
        <p className="text-base font-bold">More by {result.user?.name}</p>

        <Link
          href={`/profile/${result.user?.id}`}
          className="text-base text-primary-purple"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
          <div className="flexCenter related_project-card drop-shadow-card">
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

              <div className="related_project-card_title hidden group-hover:flex">
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
