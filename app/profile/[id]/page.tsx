import ProfilePage from '@/components/ProfilePage';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

async function Profile({ params: { id } }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: result, error } = await supabase
    .from('profiles')
    .select('*, projects(*)')
    .eq('id', id)
    .single();

  console.log(result);

  if (!result) {
    return <div>Not found</div>;
  }

  return <ProfilePage user={result} />;
}

export default Profile;
