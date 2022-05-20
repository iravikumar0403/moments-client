import { PostCard, PostSkeleton } from "components";
import { usePosts } from "hooks/selectors";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "redux/features/postSlice";

export const Explore = () => {
  useDocumentTitle("Explore / Moments");
  const { loading, explorePosts, exploreHasMore, explorePage } = usePosts();
  const [loaderRef, setLoaderRef] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].intersectionRatio <= 0) return;
        if (exploreHasMore) dispatch(getAllPosts(explorePage + 1));
      },
      {
        threshold: 0.5,
      }
    );
    loaderRef && intersectionObserver.observe(loaderRef);

    return () => loaderRef && intersectionObserver.unobserve(loaderRef);
  }, [dispatch, exploreHasMore, explorePage, loaderRef]);

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
