import { Loader, PostCard } from "components";
import { usePosts } from "hooks/selectors";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "redux/features/postSlice";

export const Explore = () => {
  useDocumentTitle("Explore / Moments");
  const { loading, allPosts } = usePosts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading && allPosts.length === 0) {
    return (
      <div className="flex mt-52 justify-center">
        <Loader />
      </div>
    );
  }

  return allPosts.map((post) => <PostCard post={post} key={post._id} />);
};
