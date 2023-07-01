import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

async function CreateProject() {
  const session = await getCurrentUser();

  if (!session?.user) {
    redirect('/');
  }

  return (
    <Modal>
      <h3 className="modal-head-text">
        Create a New Project
        <ProjectForm type={'create'} session={session} />
      </h3>
    </Modal>
  );
}

export default CreateProject;
