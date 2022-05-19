import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

export const UserCard = ({ user }) => {
  return (
    <>
      <div className="flex items-center">
        <Avatar profile={user.avatar} name={user.firstname} />
        <div className="px-3">
          <p>
            {user.firstname} {user.lastname}
          </p>
          <p className="text-slate-500 text-sm">@{user.username}</p>
        </div>
      </div>
      <Link to={`/profile/${user.username}`} className="mr-5 btn-primary px-5">
        View profile
      </Link>
    </>
  );
};
