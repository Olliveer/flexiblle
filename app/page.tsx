'use client';

import Categories from '@/components/Categories';
import LoadMore from '@/components/LoadMore';
import ProjectCard from '@/components/ProjectCard';
import { fecthAllProjects } from '@/lib/actions';
import { ProjectInterface } from '@/model/global';

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
      <section className="flexStart paddings flex-col">
        <Categories />
        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }

  const pagination = data.projectSearch?.pageInfo;

  return (
    <section className="flex-start paddings mb-16 flex-col">
      <Categories />
      <section className="projects-grid">
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
