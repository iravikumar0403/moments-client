import { useProfile } from "hooks/selectors";
import { NavLink } from "react-router-dom";

export const ProfileTabs = () => {
  const { userProfile, userPosts } = useProfile();
  if (!userProfile) {
    return;
  }

  return (
    <div className="mx-2 md:mx-0 shadow bg-white flex border-b text-center dark:bg-slate-800">
      <NavLink
        to={`/profile/${userProfile.username}`}
        end
        className={({ isActive }) =>
          isActive ? "grow py-3 text-teal-500" : "grow py-3 "
        }
      >
        Posts ({userPosts.length})
      </NavLink>
      <NavLink
        to={`/profile/${userProfile.username}/followers`}
        className={({ isActive }) =>
          isActive ? "grow py-3 text-teal-500" : "grow py-3 "
        }
      >
        Followers ({userProfile.followers.length})
      </NavLink>
      <NavLink
        to={`/profile/${userProfile.username}/following`}
        className={({ isActive }) =>
          isActive ? "grow py-3 text-teal-500" : "grow py-3 "
        }
      >
        Following ({userProfile.following.length})
      </NavLink>
    </div>
  );
};
