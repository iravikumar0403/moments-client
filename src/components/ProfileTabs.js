import { useProfile } from "hooks/selectors";
import { NavLink } from "react-router-dom";

export const ProfileTabs = () => {
  const { userProfile, userPosts } = useProfile();
  if (!userProfile) {
    return;
  }

  return (
    <div className="mx-2 md:mx-0 bg-white flex border-b text-center dark:bg-slate-800">
      <NavLink to={`/profile/${userProfile.username}`} className="grow py-3">
        Posts ({userPosts.length})
      </NavLink>
      <NavLink
        to={`/profile/${userProfile.username}/followers`}
        className="grow py-3"
      >
        Followers ({userProfile.followers.length})
      </NavLink>
      <NavLink
        to={`/profile/${userProfile.username}/following`}
        className="grow py-3"
      >
        Following ({userProfile.following.length})
      </NavLink>
    </div>
  );
};
