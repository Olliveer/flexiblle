'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useRef, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';

function Modal({ children }: { children: ReactNode }) {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (modalIsOpen) {
      setModalIsOpen(false);
      router.push('/');
    }
  }, [overlay]);

  return (
    <Dialog modal onOpenChange={handleClick} open={modalIsOpen}>
      <DialogContent className=" h-[800px] w-[400px] overflow-auto md:h-[900px] md:min-w-[800px] ">
        <DialogHeader>
          <DialogDescription className="py-10 ">{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
