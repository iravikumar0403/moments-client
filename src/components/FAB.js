import React, { useEffect, useState } from "react";
import reactDom from "react-dom";
import { BiArrowToTop } from "react-icons/bi";

export const FAB = () => {
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    //to-do: throttle this function
    const handleScroll = () => {
      if (document.documentElement.scrollTop > 350) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return reactDom.createPortal(
    showFab && (
      <button
        className="btn-primary fixed bottom-0 right-0 mr-10 p-3 my-5 rounded-full"
        onClick={handleClick}
      >
        <BiArrowToTop size="1.5rem" />
      </button>
    ),
    document.body
  );
};
