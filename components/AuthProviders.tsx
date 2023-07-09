'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

function AuthProviders() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  async function handleSignIn() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (data) {
      router.push('/');
    }
  }

  return <Button onClick={() => handleSignIn()}>Sign in with google</Button>;
}

export default AuthProviders;
