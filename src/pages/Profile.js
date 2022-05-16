import { ProfileDetails, ProfileTabs } from "components";
import { useAuth } from "hooks/selectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getUserByUsername } from "redux/features/profileSlice";

export const Profile = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();

  console.log(user, username);
  useEffect(() => {
    if (!username) {
      dispatch(getUserByUsername(user.username));
    } else {
      dispatch(getUserByUsername(username));
    }
  }, [dispatch, user, username]);

  return (
    <div className="bg-white min-h-[85vh] rounded min-w-[24rem] dark:bg-slate-800">
      <ProfileDetails />
      <ProfileTabs />
      <Outlet />
    </div>
  );
};
