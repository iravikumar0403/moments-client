import { useEffect } from "react";
import { PostCard, PostSkeleton, Avatar, SortPost } from "components";
import { useDispatch } from "react-redux";
import { useAuth, usePosts } from "hooks/selectors";
import { getBookmarks, getFeedPosts } from "redux/features/postSlice";
import { showModal } from "redux/features/modalSlice";
import { POST } from "utils/constants";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { sortPosts } from "utils/sortPosts";

export const Feed = () => {
  useDocumentTitle("Home / Moments");
  const { loading, creatingPost, posts, sortBy } = usePosts();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const feed = sortPosts(posts, sortBy);
  useEffect(() => {
    dispatch(getFeedPosts());
    dispatch(getBookmarks());
  }, [dispatch]);

  return (
    <>
      <div className="hidden md:block mb-2 dark:border-slate-600">
        <div className="flex bg-white mb-2 p-4 rounded dark:bg-slate-800">
          <Avatar profile={user.avatar} name={user.firstname} />
          <button
            className="rounded-full w-full bg-slate-100 text-left ml-2 px-5 text-gray-500 dark:bg-slate-700 dark:text-gray-200"
            onClick={() => dispatch(showModal({ type: POST }))}
          >
            Start a post
          </button>
        </div>
      </div>
      <SortPost />
      {creatingPost && <PostSkeleton />}
      {loading ? (
        <>
          <PostSkeleton /> <PostSkeleton />
        </>
      ) : feed.length > 0 ? (
        feed.map((post) => <PostCard post={post} key={post._id} />)
      ) : (
        <div className="text-center">
          <p className="text-center mt-32 text-slate-500">
            Share your moments and make new friends.
          </p>
          <Link to="/explore" className="text-center text-teal-500">
            Explore moments
          </Link>
        </div>
      )}
    </>
  );
};
