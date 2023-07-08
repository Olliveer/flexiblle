import Image from 'next/image';

import Link from 'next/link';
import Button from './Button';
import ProjectCard from './ProjectCard';
import { ProjectInterface, UserProfile } from '@/model/global';

type Props = {
  user: UserProfile;
};

const ProfilePage = ({ user }: Props) => (
  <section className="max-w-10xl mx-auto flex w-full flex-col items-center justify-center px-5 py-6 lg:px-20">
    <section className="flex w-full items-center justify-between gap-10 max-lg:flex-col">
      <div className="flex w-full flex-col items-start">
        <Image
          src={user?.avatarUrl}
          width={100}
          height={100}
          className="rounded-full"
          alt="user image"
        />
        <p className="mt-10 text-4xl font-bold">{user?.name}</p>
        <p className="mt-5 max-w-lg text-3xl font-extrabold md:mt-10 md:text-5xl">
          I’m Software Engineer 👋
        </p>

        <div className="mt-8 flex w-full flex-wrap gap-5">
          <Button
            type="button"
            title="Follow"
            leftIcon="/plus-round.svg"
            bgColor="bg-light-white-400 !w-max"
            textColor="text-black-100"
          />
          <Link href={`mailto:${user?.email}`}>
            <Button type="button" title="Hire Me" leftIcon="/email.svg" />
          </Link>
        </div>
      </div>

      {user?.projects?.edges?.length > 0 ? (
        <Image
          src={user?.projects?.edges[0]?.node?.image}
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
        {user?.projects?.edges?.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={user.name}
            avatarUrl={user.avatarUrl}
            userId={user.id}
          />
        ))}
      </div>
    </section>
  </section>
);

export default ProfilePage;
