import { useState } from "react";
import { Avatar } from "./Avatar";
import { BsGlobe } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { ButtonWithLoader } from "./ButtonWithLoader";
import { useAuth, useProfile } from "hooks/selectors";
import { followUser, unfollowerUser } from "redux/features/profileSlice";
import { addFollowing, removeFollowing } from "redux/features/userSlice";
import { showModal } from "redux/features/modalSlice";
import { HiPencilAlt } from "react-icons/hi";

export const ProfileDetails = () => {
  const { userProfile } = useProfile();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = async () => {
    setLoading(true);
    const thunkData = await dispatch(followUser(userProfile._id));
    await dispatch(addFollowing(thunkData.payload));
    setLoading(false);
  };

  const handleUnfollow = async () => {
    setLoading(true);
    const thunkData = await dispatch(unfollowerUser(userProfile._id));
    await dispatch(removeFollowing(thunkData.payload));
    setLoading(false);
  };

  const isFollowed = (user, id_to_check) =>
    user.following.find((followingUser) => followingUser._id === id_to_check);

  return (
    <div className="mx-2 md:mx-0 shadow bg-white flex flex-col vw-full border-b dark:bg-slate-800">
      <div className="relative">
        <img
          className="w-full rounded max-h-36 w-full object-cover"
          src={userProfile.cover}
          alt="cover_pic"
        />
        {userProfile.username === user.username && (
          <button
            className="m-2 p-2 absolute bottom-0 right-0 hover:bg-slate-500 rounded-full"
            title="Edit cover image"
            onClick={() => dispatch(showModal({ type: "cover" }))}
          >
            <HiPencilAlt size="1.2rem" className="text-teal-100" />
          </button>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="-mt-16 mx-2 border-4 border-white dark:border-slate-900 rounded-full z-10">
          <Avatar
            profile={userProfile.avatar}
            name={userProfile.firstname}
            size="lg"
          />
        </div>
        {userProfile.username === user.username ? (
          <button
            className="btn-primary px-4 mx-4"
            onClick={() => dispatch(showModal({ type: "profile" }))}
          >
            Edit Profile
          </button>
        ) : isFollowed(user, userProfile._id) ? (
          <ButtonWithLoader
            isLoading={loading}
            className="btn-primary px-4 mx-4 flex items-center"
            onClick={handleUnfollow}
          >
            Unfollow
          </ButtonWithLoader>
        ) : (
          <ButtonWithLoader
            isLoading={loading}
            className="btn-primary px-4 mx-4 flex items-center"
            onClick={handleFollow}
          >
            Follow
          </ButtonWithLoader>
        )}
      </div>
      <p className="text-3xl px-4 mt-2">
        {userProfile.firstname} {userProfile.lastname}
      </p>
      <div className="flex justify-between flex-col md:flex-row mr-10">
        <p className="text-slate-500 px-4 dark:text-slate-400 grow-1">
          @{userProfile.username}
        </p>
        {userProfile.website && (
          <a
            href={userProfile.website}
            className="flex items-center text-blue underline px-4 grow-1"
          >
            <BsGlobe className="mr-2" />
            {userProfile.website.split("https://")[1]}
          </a>
        )}
      </div>
      <p className="text-slate-600 px-4 dark:text-slate-300 my-2">
        {userProfile.bio}
      </p>
    </div>
  );
};
