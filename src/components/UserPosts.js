import { useProfile } from "hooks/selectors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "redux/features/modalSlice";
import { getPostsByUser } from "redux/features/profileSlice";
import { Loader } from "./Loader";
import { PostCard } from "./PostCard";

export const UserPosts = () => {
  const [loading, setLoading] = useState(true);
  const { userProfile, userPosts } = useProfile();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userProfile)
      dispatch(getPostsByUser(userProfile._id)).then(() => setLoading(false));
  }, [dispatch, userProfile]);

  if (!userProfile) {
    return;
  }

  if (loading && userPosts.length === 0) {
    return (
      <div className="flex justify-center mt-14">
        <Loader />
      </div>
    );
  }

  if (userPosts.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col">
        <p className="text-slate-500 my-4 text-sm">
          You have not shared a moment yet.
        </p>
        <button
          className="btn-primary px-5"
          onClick={() => dispatch(showModal({ type: "post" }))}
        >
          Share a moment
        </button>
      </div>
    );
  }

  return userPosts.map((post) => <PostCard post={post} key={post._id} />);
};
