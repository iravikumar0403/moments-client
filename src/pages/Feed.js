import { useEffect } from "react";
import { Loader, PostCard, PostSkeleton, Avatar } from "components";
import { useDispatch } from "react-redux";
import { useAuth, usePosts } from "hooks/selectors";
import { getAllPosts, getBookmarks } from "redux/features/postSlice";
import { showModal } from "redux/features/modalSlice";

export const Feed = () => {
  const { loading, creatingPost, allPosts } = usePosts();
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getBookmarks());
  }, [dispatch]);

  if (loading && allPosts.length === 0) {
    return (
      <div className="flex mt-52 justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block border-b mb-2 dark:border-slate-600">
        <div className="flex bg-white mb-2 p-4 rounded dark:bg-slate-800">
          <Avatar profile={user.avatar} name={user.firstname} />
          <button
            className="rounded-full w-full bg-slate-100 text-left ml-2 px-5 text-gray-500 dark:bg-slate-700 dark:text-gray-200"
            onClick={() => dispatch(showModal({ type: "post" }))}
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
