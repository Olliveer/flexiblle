import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function CreateProject() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  return (
    <Modal>
      <h3 className="w-full max-w-5xl text-left text-3xl font-extrabold md:text-5xl">
        Create a New Project
        <ProjectForm type={'create'} session={session} />
      </h3>
    </Modal>
  );
}

export default CreateProject;
