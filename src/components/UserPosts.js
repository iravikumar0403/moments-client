import { useAuth, useProfile } from "hooks/selectors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "redux/features/modalSlice";
import { getPostsByUser } from "redux/features/profileSlice";
import { POST } from "utils/constants";
import { Loader } from "./Loader";
import { PostCard } from "./PostCard";

export const UserPosts = () => {
  const [loading, setLoading] = useState(true);
  const { userProfile, userPosts } = useProfile();
  const { user } = useAuth();
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
        {userProfile.username === user.username ? (
          <>
            <p className="text-slate-500 my-4 text-sm">
              You have not shared a moment yet.
            </p>
            <button
              className="btn-primary px-5"
              onClick={() => dispatch(showModal({ type: POST }))}
            >
              Share a moment
            </button>
          </>
        ) : (
          <p className="text-slate-500 my-4 text-sm">
            {userProfile.firstname} has not shared any posts yet!
          </p>
        )}
      </div>
    );
  }

  return userPosts.map((post) => <PostCard post={post} key={post._id} />);
};
