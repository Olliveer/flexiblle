import { ProjectForm } from '@/model/global';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { isBase64DataURL } from './utils';

const isProduction = process.env.NODE_ENV === 'production';

const serverUrl = isProduction
  ? (process.env.NEXT_PUBLIC_SERVER_URL as string)
  : 'http://localhost:3000';

const supabase = createClientComponentClient();

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// grafbase
// export const createProject = async (
//   form: ProjectForm,
//   creatorId: string,
//   token: string
// ) => {
//   const imageUrl = await uploadImage(form.image);

//   if (imageUrl.url) {
//     client.setHeader('Authorization', `Bearer ${token}`);
//     const variables = {
//       input: {
//         ...form,
//         image: imageUrl.url,
//         createdBy: {
//           link: creatorId,
//         },
//       },
//     };

//     return makeGraphQLRequest(createProjectMutation, variables);
//   }
// };

// supabase
export const createProject = async (form: ProjectForm, creatorId: string) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    return supabase.from('projects').insert({
      title: form.title,
      description: form.description,
      image: imageUrl.url,
      user_id: creatorId,
      github_url: form.githubUrl,
      live_site_url: form.liveSiteUrl,
      category: form.category,
    });
  }

  return supabase.from('projects').insert({
    title: form.title,
    description: form.description,
    image: '',
    user_id: creatorId,
    github_url: form.githubUrl,
    live_site_url: form.liveSiteUrl,
    category: form.category,
  });
};

// supabase
export const fecthAllProjects = async (
  category?: string,
  endCursor?: string
) => {
  return supabase.from('projects').select('*, profiles(*)');
};

export const deleteProject = async (id: string) => {
  return supabase.from('projects').delete().eq('id', id);
};

export const updateProject = async (form: ProjectForm, projectId: string) => {
  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = {
        ...form,
        image: imageUrl.url,
      };
    }
  }

  return supabase
    .from('projects')
    .update({
      title: updatedForm.title,
      description: updatedForm.description,
      image: updatedForm.image,
      github_url: updatedForm.githubUrl,
      live_site_url: updatedForm.liveSiteUrl,
      category: updatedForm.category,
    })
    .match({ id: projectId });
};
