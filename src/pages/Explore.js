import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "redux/features/postSlice";
import { PostCard, PostSkeleton } from "components";
import { usePosts } from "hooks/selectors";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useInfiniteScroll } from "hooks/useInfiniteScroll";

export const Explore = () => {
  useDocumentTitle("Explore / Moments");
  const { loading, explorePosts, exploreHasMore, explorePage } = usePosts();
  const dispatch = useDispatch();
  const loadMore = () =>
    exploreHasMore && dispatch(getAllPosts(explorePage + 1));
  const { setLoaderRef } = useInfiniteScroll(loadMore);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading && explorePosts.length === 0) {
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  }

  return (
    <>
      {explorePosts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
      {exploreHasMore ? (
        <div ref={setLoaderRef}>
          <PostSkeleton />
        </div>
      ) : (
        <p className="text-center text-slate-500">You have reached the end</p>
      )}
    </>
  );
};
