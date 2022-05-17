import { useProfile } from "hooks/selectors";
import { Avatar } from "./Avatar";

export const Following = () => {
  const { userProfile } = useProfile();

  return userProfile.following.map((user) => (
    <div className="flex items-center justify-between bg-white rounded my-2 px-4 py-2 dark:bg-slate-800">
      <div className="flex items-center">
        <Avatar profile={user.avatar} name={user.firstname} />
        <div className="px-3">
          <p>
            {user.firstname} {user.lastname}
          </p>
          <p className="text-slate-500 text-sm">@{user.username}</p>
        </div>
      </div>
      <button className="mr-5 btn-primary px-5">Follow</button>
    </div>
  ));
};
