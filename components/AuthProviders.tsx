'use client';

import { useEffect, useState } from 'react';
import { getProviders, signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';

type Provider = {
  id: string;
  name: string;
  signinUrl: string;
  callbackUrl: string;
  siginUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

function AuthProviders() {
  const [providers, setproviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setproviders(response);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider, index) => (
          <Button key={index} onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </Button>
        ))}
      </div>
    );
  }
}

export default AuthProviders;
