import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';
import { ProjectInterface } from '@/model/global';
import { redirect } from 'next/navigation';

async function EditProject({ params: { id } }: { params: { id: string } }) {
  const session = await getCurrentUser();

  if (!session?.user) {
    redirect('/');
  }

  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  return (
    <Modal>
      <h3 className="modal-head-text">
        Edit Project
        <ProjectForm type={'edit'} session={session} project={result.project} />
      </h3>
    </Modal>
  );
}

export default EditProject;
