'use client';

import Categories from '@/components/Categories';
import LoadMore from '@/components/LoadMore';
import ProjectCard from '@/components/ProjectCard';
import { fecthAllProjects } from '@/lib/actions';
import { ProjectInterface } from '@/model/global';
import Link from 'next/link';

type Edge = {
  node: ProjectInterface;
};

type ProjectsSearch = {
  projectSearch: {
    edges: Edge[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

type HomeProps = {
  searchParams: {
    category?: string;
    endCursor?: string;
  };
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default async function Home({
  searchParams: { category, endCursor },
}: HomeProps) {
  const data = (await fecthAllProjects(category, endCursor)) as ProjectsSearch;
  const projectsToDisplay = data.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
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

  const pagination = data.projectSearch?.pageInfo;

  return (
    <section className="flex-start mb-16 flex-col px-5 py-6 lg:px-20">
      <Categories />
      <section className="mt-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            avatarUrl={node.createdBy.avatarUrl}
            key={node.id}
            image={node.image}
            name={node.createdBy.name}
            title={node.title}
            userId={node.createdBy.id}
            id={node.id}
          />
        ))}
      </section>
      <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasNextPage={pagination.hasNextPage}
        hasPreviousPage={pagination.hasPreviousPage}
      />
    </section>
  );
}
