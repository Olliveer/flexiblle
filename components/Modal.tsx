'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent, ReactNode, useCallback, useRef } from 'react';

function Modal({ children }: { children: ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  return (
    <div ref={overlay} className="modal " onClick={handleClick}>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute right-8 top-4"
      >
        <Image src={'/close.svg'} alt={'close'} width={17} height={17} />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
}

export default Modal;
