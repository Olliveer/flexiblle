'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent, ReactNode, useCallback, useRef, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from './ui/scroll-area';

function Modal({ children }: { children: ReactNode }) {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (modalIsOpen) {
      setModalIsOpen(false);
      router.push('/');
    }
  }, [overlay]);

  return (
    <Dialog modal onOpenChange={handleClick} open={modalIsOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className=" h-[800px] w-[400px] overflow-auto md:h-[900px] md:min-w-[800px] ">
        <DialogHeader>
          {/* <DialogTitle>Are you sure absolutely sure?</DialogTitle> */}
          <DialogDescription className="py-10 ">{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    // <div
    //   ref={overlay}
    //   className="fixed bottom-0 left-0  right-0 top-0 z-10 mx-auto bg-black/80 "
    //   onClick={handleClick}
    // >
    //   <button
    //     type="button"
    //     onClick={onDismiss}
    //     className="absolute right-8 top-4"
    //   >
    //     <Image src={'/close.svg'} alt={'close'} width={17} height={17} />
    //   </button>
    //   <div
    //     ref={wrapper}
    //     className="absolute bottom-0 flex h-[95%] w-full flex-col items-center justify-start overflow-auto rounded-t-3xl bg-white px-8 pb-72 pt-14 lg:px-40"
    //   >
    //     {children}
    //   </div>
    // </div>
  );
}

export default Modal;
