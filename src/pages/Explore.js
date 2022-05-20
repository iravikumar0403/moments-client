import { PostCard, PostSkeleton } from "components";
import { usePosts } from "hooks/selectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "redux/features/postSlice";

export const Explore = () => {
  const { loading, posts } = usePosts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  }

  return posts.map((post) => <PostCard post={post} key={post._id} />);
};
