'use client';

import { FormState, ProjectInterface, SessionInterface } from '@/model/global';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import Button from './Button';
import { createProject, fetchToken, updateProject } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type ProjectFormProps = {
  type: 'create' | 'edit';
  session: SessionInterface;
  project?: ProjectInterface;
};

function ProjectForm({ type, session, project }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    liveSiteUrl: project?.liveSiteUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || '',
  });

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === 'create') {
        await createProject(form, session?.user?.id, token);
        router.push('/');
      }

      if (type === 'edit') {
        console.log('edit', form);

        await updateProject(form, project?.id as string, token);
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChangeImage(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange('image', result);
    };
  }

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={handleChangeImage}
        />

        {form.image && (
          <Image
            src={form.image}
            alt="Project Poster"
            fill
            className="z-20 object-contain sm:p-10"
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder=""
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Choose a description for your project"
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        title="url"
        type="url"
        state={form.liveSiteUrl}
        placeholder="www..."
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        title="Github URL"
        type="url"
        state={form.githubUrl}
        placeholder=""
        setState={(value) => handleStateChange('githubUrl', value)}
      />

      {/* custom input category */}
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === 'create' ? 'Creating' : 'Updating'} Project`
              : `${type === 'create' ? 'Create' : 'Update'} Project`
          }
          type="submit"
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
}

export default ProjectForm;
