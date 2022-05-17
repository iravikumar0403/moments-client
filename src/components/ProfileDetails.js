import { Avatar } from "./Avatar";
import { BsGlobe } from "react-icons/bs";
import { useAuth, useProfile } from "hooks/selectors";

export const ProfileDetails = () => {
  const { userProfile } = useProfile();
  const { user } = useAuth();

  return (
    <div className="mx-2 md:mx-0 bg-white flex flex-col vw-full border-b dark:bg-slate-800">
      <div>
        <img
          className="w-full rounded max-h-36 w-full object-cover"
          src={userProfile.cover}
          alt="cover_pic"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="-mt-16 mx-2 border-4 border-white dark:border-slate-900 rounded-full">
          <Avatar
            profile={userProfile.avatar}
            name={userProfile.firstname}
            size="lg"
          />
        </div>
        {userProfile.username === user.username ? (
          <button className="btn-primary px-4 mx-4">Edit Profile</button>
        ) : (
          <button className="btn-primary px-4 mx-4">Follow</button>
        )}
      </div>
      <p className="text-3xl px-4 mt-2">
        {userProfile.firstname} {userProfile.lastname}
      </p>
      <div className="flex justify-between">
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
