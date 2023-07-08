'use client';

import { useRouter } from 'next/navigation';
import Button from './Button';

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
      {hasPreviousPage && (
        <Button
          type="button"
          title="First Page"
          handleClick={() => handleNavigation('first')}
        />
      )}
      {hasNextPage && (
        <Button
          type="button"
          title="Next Page"
          handleClick={() => handleNavigation('next')}
        />
      )}
    </div>
  );
}

export default LoadMore;
