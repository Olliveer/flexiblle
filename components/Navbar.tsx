import { NavLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import AuthProviders from './AuthProviders';
import { getCurrentUser } from '@/lib/session';
import { signOut } from 'next-auth/react';
import ProfileMenu from './ProfileMenu';

async function Navbar() {
  const session = await getCurrentUser();

  return (
    <nav className="border-nav-border flex items-center justify-between gap-4 border-b px-8 py-5">
      <div className="flex flex-1 items-center justify-start gap-10">
        <Link href="/">
          <Image src={'/logo.svg'} width={115} height={43} alt="Flexiblle" />
        </Link>

        <ul className="text-small hidden gap-7 xl:flex">
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-normal gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href={'/create-project'}>Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
