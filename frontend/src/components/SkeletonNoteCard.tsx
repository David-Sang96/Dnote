const SkeletonNoteCard = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="animate-pulse border-t-4 border-teal-600 p-3 shadow-md"
          key={index}
        >
          {/* Placeholder for the title */}
          <div className="mb-4 h-5 w-3/4 rounded bg-gray-300"></div>
          {/* Placeholder for the content */}
          <div className="mb-2 h-3 rounded bg-gray-300"></div>
          <div className="mb-2 h-3 rounded bg-gray-300"></div>
          <div className="h-3 w-5/6 rounded bg-gray-300"></div>
        </div>
      ))}
    </>
  );
};

export default SkeletonNoteCard;
