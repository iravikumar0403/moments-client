import { useProfile } from "hooks/selectors";
import { NavLink } from "react-router-dom";

export const ProfileTabs = () => {
  const { userProfile } = useProfile();

  return (
    <div className="flex border-b text-center">
      <NavLink to={`/profile/${userProfile.username}`} className="grow py-3">
        Posts (23)
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
