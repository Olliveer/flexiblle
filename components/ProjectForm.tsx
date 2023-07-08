'use client';

import { FormState, ProjectInterface, SessionInterface } from '@/model/global';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { createProject, fetchToken, updateProject } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader2, Plus } from 'lucide-react';
import { revalidatePath } from 'next/cache';

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
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto flex w-full max-w-5xl flex-col items-center justify-start gap-10  pt-12 text-lg lg:pt-24"
    >
      <div className="relative flex min-h-[200px] w-full items-center justify-start">
        <Label
          htmlFor="image"
          className="z-10 flex h-full w-full cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-200 p-20 text-center text-gray-500"
        >
          {!form.image && 'Choose a poster for your project'}
        </Label>
        <input
          type="file"
          id="image"
          accept="image/*"
          required={type === 'create'}
          className="absolute z-30 hidden h-full w-full cursor-pointer"
          onChange={handleChangeImage}
        />

        {form.image && (
          <label htmlFor="image">
            <Image
              src={form.image}
              alt="Project Poster"
              fill
              className="z-20 object-contain sm:p-10"
            />
          </label>
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder=""
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        isTextArea
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
      <div className="flex w-full items-center justify-start">
        <Select
          value={form.category}
          onValueChange={(value) => handleStateChange('category', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              className="text-gray"
              placeholder="Select a category"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categoryFilters.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full items-center justify-start">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}

          {isSubmitting
            ? `${type === 'create' ? 'Creating' : 'Updating'} Project`
            : `${type === 'create' ? 'Create' : 'Update'} Project`}
        </Button>
      </div>
    </form>
  );
}

export default ProjectForm;
