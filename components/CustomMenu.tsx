'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Label } from './ui/label';

type Props = {
  title: string;
  state: string;
  filters: Array<string>;
  setState: (value: string) => void;
};

const CustomMenu = ({ title, state, filters, setState }: Props) => (
  <div className="relative flex w-full flex-col items-center justify-start gap-7">
    <Label htmlFor={title} className="w-full ">
      {title}
    </Label>
    <Menu as="div" className="relative self-start">
      <div>
        <Menu.Button className="bg-light-white-100 flex w-full items-center justify-center gap-4 rounded-md p-4 text-base capitalize outline-none">
          {state || 'Category'}
          <Image src="/arrow-down.svg" width={10} height={5} alt="arrow down" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="xs:min-w-[300px] border-nav-border shadow-menu absolute left-0 mt-2 flex max-h-64 w-fit origin-top-right flex-col items-center justify-start overflow-y-auto rounded-xl border bg-white">
          {filters.map((tag) => (
            <Menu.Item key={tag}>
              <button
                type="button"
                value={tag}
                className="hover:bg-light-white-100 w-full self-start whitespace-nowrap px-5 py-2 text-left text-sm capitalize"
                onClick={(e) => setState(e.currentTarget.value)}
              >
                {tag}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
);

export default CustomMenu;
