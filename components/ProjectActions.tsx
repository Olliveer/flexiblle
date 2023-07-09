'use client';

import { deleteProject, fetchToken } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

type ProjectActionsProps = {
  projectId: string;
};
function ProjectActions({ projectId }: ProjectActionsProps) {
  const router = useRouter();
  const [isDeleting, setisDeleting] = useState(false);

  async function handleDelete() {
    setisDeleting(true);

    try {
      await deleteProject(projectId);

      router.push('/');
    } catch (error) {
      alert(error);
    } finally {
      setisDeleting(false);
    }
  }

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flex h-10 items-center justify-center rounded-lg bg-slate-300 px-4 py-2 text-sm font-medium text-gray-100"
      >
        <Image src={'/pencile.svg'} width={15} height={15} alt="edit" />
      </Link>

      <Button
        variant={'destructive'}
        className={`flex items-center justify-center`}
        onClick={handleDelete}
      >
        {isDeleting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting
          </>
        ) : (
          <Image src={'/trash.svg'} width={15} height={15} alt="edit" />
        )}
      </Button>
    </>
  );
}

export default ProjectActions;
