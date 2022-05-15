import React, { useEffect } from "react";
import { Loader, PostCard } from "components";
import { usePosts } from "hooks/selectors";
import { useDispatch } from "react-redux";
import { getBookmarks } from "redux/features/postSlice";

export const Bookmarks = () => {
  const { loading, bookmarks } = usePosts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (bookmarks.length === 0) {
    return (
      <p className="text-center my-2 font-medium">No bookmarks to show.</p>
    );
  }

  return bookmarks.map((post) => <PostCard post={post} key={post._id} />);
};
