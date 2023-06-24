import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";

function Navbar() {
  const session = {};
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
        {session ? (
          <>
            UserPhoto
            <Link href={"/create-project"}>Share work</Link>
          </>
        ) : (
          <AuthProviders   />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
