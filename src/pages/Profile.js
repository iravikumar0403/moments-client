import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useProfile } from "hooks/selectors";
import { Outlet, useParams } from "react-router-dom";
import { getUserByUsername } from "redux/features/profileSlice";
import { Loader, ProfileDetails, ProfileTabs } from "components";

export const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { loading, userProfile } = useProfile();

  useEffect(() => {
    if (userProfile?.username !== username) {
      dispatch(getUserByUsername(username));
    }
  }, [dispatch, userProfile, username]);

  if (loading || !userProfile)
    return (
      <div className=" mt-52 flex items-center justify-center ">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-[85vh] rounded">
      <ProfileDetails />
      <ProfileTabs />
      <Outlet />
    </div>
  );
};
