const SkeletonDetail = () => {
  return (
    <section className="mx-auto max-w-2xl">
      <div className="flex animate-pulse flex-col rounded-md border-t-4 border-teal-600 p-3 shadow-md">
        {/* Title skeleton */}
        <div className="flex items-center justify-between pb-4">
          <div className="h-6 w-3/4 rounded bg-gray-300"></div>
          <div className="h-6 w-8 rounded bg-gray-300"></div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-300"></div>
          <div className="h-4 w-11/12 rounded bg-gray-300"></div>
          <div className="h-4 w-10/12 rounded bg-gray-300"></div>
        </div>

        {/* Author and Date skeleton */}
        <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
          <div className="space-y-1">
            <div className="h-3 w-24 rounded bg-gray-300"></div>
            <div className="h-3 w-32 rounded bg-gray-300"></div>
          </div>
        </div>

        {/* Edit and Delete buttons skeleton */}
        <div className="mt-4 flex items-center justify-between">
          <div className="h-5 w-5 rounded-full bg-gray-300"></div>
          <div className="h-5 w-5 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonDetail;
