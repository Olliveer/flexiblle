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
    <div className="flex flex-col items-center justify-center rounded-2xl">
      <Link
        href={`/project/${id}`}
        className="group relative flex h-full w-full items-center justify-center"
      >
        <Image
          src={image}
          alt={title}
          width={414}
          height={214}
          className="h-full w-full rounded-2xl object-cover"
        />

        <div className="absolute bottom-0 right-0 hidden h-1/3 w-full items-end justify-end gap-2 rounded-b-2xl bg-gradient-to-b from-transparent to-black/50 p-4 text-lg font-semibold text-white group-hover:flex">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="mt-3 flex w-full items-center justify-between px-2 text-sm font-semibold">
        <Link href={`/profile/${userId}`}>
          <div className="flex items-center justify-center gap-2">
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

        <div className="flex items-center justify-center gap-3 ">
          <div className="flex items-center justify-center gap-2">
            <Image src={'/hearth.svg'} alt="hearth" width={13} height={12} />
            <p className="text-sm">3123</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Image src={'/eye.svg'} alt="eye" width={13} height={12} />
            <p className="text-sm">2313k</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
