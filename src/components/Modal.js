import React, { useEffect } from "react";
import reactDom from "react-dom";
import { useModal } from "hooks/selectors";
import { EditProfileModal } from "./EditProfileModal";
import { PostInputModal } from "./PostInputModal";

export const Modal = () => {
  const { isVisible, type } = useModal();

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return reactDom.createPortal(
    <div>
      {type === "post" && <PostInputModal />}
      {type === "profile" && <EditProfileModal />}
    </div>,
    document.body
  );
};
