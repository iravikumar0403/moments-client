import { usePosts } from "hooks/selectors";
import { useOnOutsideClick } from "hooks/useOnOutsideClick";
import { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setSortBy } from "redux/features/postSlice";
import { LATEST_FIRST, OLDEST_FIRST, TRENDING } from "utils/constants";

export const SortPost = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const { sortBy } = usePosts();
  const { element } = useOnOutsideClick(() => setShowDropdown(false));

  const handleClick = (order) => {
    dispatch(setSortBy(order));
    setShowDropdown(false);
  };

  const formatSortBy = () =>
    sortBy[0] +
    sortBy.substring(1, sortBy.length).split("_").join(" ").toLowerCase();

  return (
    <div className="flex items-center mx-2 md:mx-0">
      <hr className="flex-grow border-slate-500" />
      <div className="mx-2 pb-1 relative" ref={element}>
        <button
          className="flex items-center"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          Sort by: {formatSortBy(sortBy)}
          <AiOutlineCaretDown className="mx-2" />
        </button>
        {showDropdown && (
          <div className="absolute right-0 flex flex-col mx-2 bg-slate-50 dark:bg-slate-600 p-2 rounded min-w-max z-10">
            <button
              className="py-1 px-8 rounded hover:text-teal-500 hover:bg-teal-50"
              onClick={() => handleClick(TRENDING)}
            >
              Trending
            </button>
            <button
              className="py-1 px-8 rounded hover:text-teal-500 hover:bg-teal-50"
              onClick={() => handleClick(LATEST_FIRST)}
            >
              Latest first
            </button>
            <button
              className="py-1 px-8 rounded hover:text-teal-500 hover:bg-teal-50"
              onClick={() => handleClick(OLDEST_FIRST)}
            >
              Oldest first
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
