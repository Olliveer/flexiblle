import { Skeleton } from '@/components/ui/skeleton';

function loading() {
  return (
    <section className="flex-start mb-16 flex-col px-5 py-6 lg:px-20">
      {/* <Categories /> */}
      <section className="mt-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-2xl"
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <Skeleton className=" h-[214px] w-[414px] rounded-2xl" />

              <div className="absolute bottom-0 right-0 hidden h-1/3 w-full items-end justify-end gap-2 rounded-b-2xl bg-gradient-to-b from-transparent to-black/50 p-4 text-lg font-semibold text-white group-hover:flex">
                <Skeleton className="h-6 w-full" />
              </div>
            </div>

            <div className="mt-3 flex w-full items-center justify-between px-2 text-sm font-semibold">
              <div className="flex items-center justify-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-16" />
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* TODO: pagination */}
      {/* <LoadMore
      startCursor={pagination.startCursor}
      endCursor={pagination.endCursor}
      hasNextPage={pagination.hasNextPage}
      hasPreviousPage={pagination.hasPreviousPage}
    /> */}
    </section>
  );
}

export default loading;
