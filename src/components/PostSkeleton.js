export const PostSkeleton = () => {
  return (
    <div className="flex flex-col bg-white max-w-full h-max mx-2 md:mx-0 rounded mb-4 animate-pulse dark:bg-slate-800">
      <div className="w-full flex items-center">
        <div className="bg-slate-300 dark:bg-slate-500 mx-4 mt-4 rounded-full h-12 w-12"></div>
        <div className="bg-slate-300 dark:bg-slate-500 rounded h-6 w-1/3"></div>
      </div>
      <div className="mx-4 my-2">
        <div className="bg-slate-300 dark:bg-slate-500 rounded h-4 w-full mb-1"></div>
        <div className="bg-slate-300 dark:bg-slate-500 rounded h-4 w-full mb-1"></div>
        <div className="bg-slate-300 dark:bg-slate-500 rounded h-4 w-1/2 mb-1"></div>
      </div>
      <div className="bg-slate-300 dark:bg-slate-500 w-full h-32"></div>
      <div className="flex  justify-between">
        <div className="flex m-2">
          <span className="bg-slate-300 dark:bg-slate-500 rounded-full w-8 h-8 block mx-2"></span>
          <span className="bg-slate-300 dark:bg-slate-500 rounded-full w-8 h-8 block mx-2"></span>
        </div>
        <span className="bg-slate-300 dark:bg-slate-500 rounded-full w-8 h-8 block mx-6 my-2"></span>
      </div>
    </div>
  );
};
