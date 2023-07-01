import ProfilePage from '@/components/ProfilePage';
import { getUserProjects } from '@/lib/actions';
import { UserProfile } from '@/model/global';
import React from 'react';

async function Profile({ params: { id } }: { params: { id: string } }) {
  const result = (await getUserProjects(id, 100)) as {
    user: UserProfile;
  };

  if (!result) {
    return <div>Not found</div>;
  }

  return <ProfilePage user={result.user} />;
}

export default Profile;
