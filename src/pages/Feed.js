import { useEffect } from "react";
import { Loader, PostCard, PostSkeleton } from "components";
import { useDispatch } from "react-redux";
import { usePosts } from "hooks/selectors";
import { getAllPosts } from "redux/features/postSlice";
import { showModal } from "redux/features/modalSlice";

export const Feed = () => {
  const { loading, creatingPost, allPosts } = usePosts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading && allPosts.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <div className="hidden md:block border-b mb-2 dark:border-slate-600">
        <div className="flex bg-white mb-2 p-4 rounded dark:bg-slate-800">
          <img
            className="w-12 rounded-full mr-2"
            src="http://www.gravatar.com/avatar/?d=mp"
            alt="author name"
          />
          <button
            className="rounded-full w-full bg-slate-100 text-left px-5 text-gray-500 dark:bg-slate-700 dark:text-gray-200"
            onClick={() => dispatch(showModal())}
          >
            Start a post
          </button>
        </div>
      </div>
      {creatingPost && <PostSkeleton />}
      {allPosts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </>
  );
};
