"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

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

      console.log(response);
      setproviders(response);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider, index) => (
          <button key={index} onClick={() => signIn(provider.id)}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  }
}

export default AuthProviders;
