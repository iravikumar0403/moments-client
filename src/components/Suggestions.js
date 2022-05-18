import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Loader } from "./Loader";

export const Suggestions = () => {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (suggestions.length === 0) {
      (async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/suggestions`
        );
        setLoading(false);
        setSuggestions(data);
      })();
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center align-center mt-24">
        <Loader />
      </div>
    );
  }

  return (
    <aside className="hidden lg:block sticky top-[10vh] h-[85vh] bg-white rounded mt-16 mx-auto p-4 w-full max-w-[18rem] dark:bg-slate-800">
      <p className="text-semibold text-xl py-2 text-center border-b">
        People you may know
      </p>
      {suggestions.length === 0 && (
        <p className="text-center text-slate-500 mt-24">
          No suggestions for now.
          <br /> Check back later :)
        </p>
      )}
      {suggestions.map(({ avatar, firstname, lastname, username }) => (
        <Link to={`/profile/${username}`} className="flex py-2">
          <Avatar profile={avatar} name={firstname} />
          <div className="px-4">
            <p>
              {firstname} {lastname}
            </p>
            <p className="text-slate-500">@{username}</p>
          </div>
        </Link>
      ))}
    </aside>
  );
};
