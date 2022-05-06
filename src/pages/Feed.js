import { PostCard } from "components";

export const Feed = () => {
  return (
    <>
      <div className="hidden md:block border-b mb-2">
        <div className="flex bg-white mb-2 p-4 rounded dark:bg-slate-800">
          <img
            className="w-12 rounded-full mr-2"
            src="https://i.pravatar.cc/300"
            alt="author name"
          />
          <button className="rounded-full w-full bg-slate-100 text-left px-5 text-gray-500 dark:bg-slate-700 dark:text-gray-200">
            Start a post
          </button>
        </div>
      </div>
      {[...Array(10)].map(() => (
        <PostCard />
      ))}
    </>
  );
};
