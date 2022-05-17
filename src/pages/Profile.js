import { Loader, ProfileDetails, ProfileTabs } from "components";
import { useAuth, useProfile } from "hooks/selectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getUserByUsername } from "redux/features/profileSlice";

export const Profile = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { loading, userProfile } = useProfile();

  useEffect(() => {
    if (!username) {
      dispatch(getUserByUsername(user.username));
    } else {
      dispatch(getUserByUsername(username));
    }
  }, [dispatch, user, username]);

  if (loading || !userProfile)
    return (
      <div className=" mt-52 flex items-center justify-center ">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-[85vh] rounded min-w-[24rem] ">
      <ProfileDetails />
      <ProfileTabs />
      <Outlet />
    </div>
  );
};
