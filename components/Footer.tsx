import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ColumnProps = {
  title: string;
  links: string[];
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link key={link} href={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

function Footer() {
  return (
    <footer className="flexStart footer">
      <div className="flex w-full flex-col gap-12">
        <div className="flex-start flex flex-col">
          <Image
            src={"/logo-purple.svg"}
            width={115}
            height={43}
            alt="Flexiblle"
          />
          <p className="mt-5 max-w-xs text-start text-sm font-normal">
            Flexible is a platform for sharing work. It’s a place where
            designers, developers, and creatives of all kinds can share their
            work and discover that of others.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />

          <div className="flex flex-1 flex-col gap-4">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>
          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />

          <div className="flex flex-1 flex-col gap-4">
            <FooterColumn
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumn
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>
        </div>
      </div>

      <div className="flexBetween footer_copyright">
        <p>@ 2023 Flexiblles. All rights reserved</p>

        <p className="text-gray">
          <span className="font-semibold text-black">10,214</span> projects
          shared
        </p>
      </div>
    </footer>
  );
}

export default Footer;
