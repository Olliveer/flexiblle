import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";

async function Navbar() {
  const session = await getCurrentUser();

  console.log(session);
  return (
    <nav className="flexBetween navbar">
      <div className="flexStart flex-1 gap-10">
        <Link href="/">
          <Image src={"/logo.svg"} width={115} height={43} alt="Flexiblle" />
        </Link>

        <ul className="text-small hidden gap-7 xl:flex">
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {session.user.image && (
              <Image
                src={session.user.image}
                height={40}
                width={40}
                className="rounded-full"
                alt={session.user.name}
              />
            )}
            <Link href={"/create-project"}>Share work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
