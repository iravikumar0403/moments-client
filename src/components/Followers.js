import { useProfile } from "hooks/selectors";
import { UserCard } from "./UserCard";

export const Followers = () => {
  const { userProfile } = useProfile();

  return userProfile.followers.map((user) => (
    <div className="flex items-center justify-between mx-2 md:mx-0 bg-white shadow rounded my-2 px-4 py-2 dark:bg-slate-800">
      <UserCard user={user} />
    </div>
  ));
};
