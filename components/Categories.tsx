'use client';

import { categoryFilters } from '@/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Categories() {
  const router = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  function handleTags(filter: string) {
    router.push(`${patchName}?category=${filter}`);
  }

  return (
    <div className="flexBetween w-full flex-wrap gap-5">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <button
            className={` ${
              category === filter
                ? 'bg-light-white-300 font-medium'
                : 'font-normal'
            } whitespace-nowrap rounded-lg px-4 py-3 capitalize`}
            type="button"
            key={filter}
            onClick={() => handleTags(filter)}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
