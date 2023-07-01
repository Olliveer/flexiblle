import Image from 'next/image';
import Link from 'next/link';

type ProjectCardProps = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

function ProjectCard({
  avatarUrl,
  id,
  image,
  name,
  title,
  userId,
}: ProjectCardProps) {
  return (
    <div className="flexCenter drop-shadow-card flex-col rounded-2xl">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative h-full w-full"
      >
        <Image
          src={image}
          alt={title}
          width={414}
          height={214}
          className="h-full w-full rounded-2xl object-cover"
        />

        <div className="profile_card-title hidden group-hover:flex">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween mt-3 w-full px-2 text-sm font-semibold">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              alt={name}
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
            <p>{name}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3 ">
          <div className="flexCenter gap-2">
            <Image src={'/hearth.svg'} alt="hearth" width={13} height={12} />
            <p className="text-sm">3123</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src={'/eye.svg'} alt="eye" width={13} height={12} />
            <p className="text-sm">2313k</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
