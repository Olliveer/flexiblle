'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

type LoadMoreProps = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

function LoadMore({
  endCursor,
  hasNextPage,
  hasPreviousPage,
  startCursor,
}: LoadMoreProps) {
  const router = useRouter();

  function handleNavigation(direction: string) {
    const currentParams = new URLSearchParams(window.location.search);

    if (direction === 'next' && hasNextPage) {
      currentParams.delete('startCursor');
      currentParams.set('endCursor', endCursor);
    } else if (direction === 'first' && hasPreviousPage) {
      currentParams.delete('endCursor');
      currentParams.set('startCursor', startCursor);
    }

    const newSearchParams = currentParams.toString();

    const newPathName = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathName);
  }

  return (
    <div className="mt-10 flex w-full items-center justify-center gap-5">
      {hasPreviousPage && <Button>Prev</Button>}
      {hasNextPage && <Button>Next</Button>}
    </div>
  );
}

export default LoadMore;
