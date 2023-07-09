'use client';

import { categoryFilters } from '@/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';

function Categories() {
  const router = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  function handleTags(filter: string) {
    router.push(`${patchName}?category=${filter}`);
  }

  return (
    <div className="flex w-full flex-wrap items-center  gap-2">
      {categoryFilters.map((filter) => (
        <Button
          variant={filter === category ? 'default' : 'secondary'}
          key={filter}
          onClick={() => handleTags(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}

export default Categories;
