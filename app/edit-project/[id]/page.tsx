import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';
import { ProjectInterface } from '@/model/global';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';

async function EditProject({ params: { id } }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    return notFound();
  }

  return (
    <Modal>
      <h3 className="w-full max-w-5xl text-left text-3xl font-extrabold md:text-5xl">
        Edit Project
        <ProjectForm type={'edit'} session={session} project={data} />
      </h3>
    </Modal>
  );
}

export default EditProject;
