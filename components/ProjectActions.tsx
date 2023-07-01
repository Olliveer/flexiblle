'use client';

import { deleteProject, fetchToken } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ProjectActionsProps = {
  projectId: string;
};
function ProjectActions({ projectId }: ProjectActionsProps) {
  const router = useRouter();
  const [isDeleting, setisDeleting] = useState(false);

  async function handleDelete() {
    setisDeleting(true);

    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);

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
        className="flexCenter edit-action_btn"
      >
        <Image src={'/pencile.svg'} width={15} height={15} alt="edit" />
      </Link>

      <button
        type="button"
        className={`flexCenter delete-action_btn ${
          isDeleting ? 'bg-gray' : 'bg-primary-purple'
        }`}
        onClick={handleDelete}
      >
        <Image src={'/trash.svg'} width={15} height={15} alt="edit" />
      </button>
    </>
  );
}

export default ProjectActions;
