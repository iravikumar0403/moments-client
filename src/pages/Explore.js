import { Loader, PostCard } from "components";
import { usePosts } from "hooks/selectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "redux/features/postSlice";

export const Explore = () => {
  const { loading, allPosts } = usePosts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading && allPosts.length === 0) {
    return <Loader />;
  }

  return allPosts.map((post) => <PostCard post={post} key={post._id} />);
};
