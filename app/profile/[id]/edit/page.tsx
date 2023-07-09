import ProfileForm from '@/components/ProfileForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function EditProfile({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from('profiles').select('*').single();

  if (!data) {
    return redirect('/');
  }

  return (
    <section className="max-w-10xl mx-auto flex w-full flex-col items-center justify-center px-5 py-6 lg:px-20">
      <h5 className="my-2 text-3xl">Editar Profile</h5>
      <ProfileForm user={data} />
    </section>
  );
}
