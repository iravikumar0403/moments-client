import React, { useEffect } from "react";
import reactDom from "react-dom";
import { useModal } from "hooks/selectors";
import { PostInputModal, EditProfileModal, EditCoverModal } from "components";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/features/modalSlice";
import { COVER, POST, PROFILE } from "utils/constants";

export const Modal = () => {
  const { isVisible, type } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
  }, [isVisible]);

  const handleClick = (e) =>
    e.target === e.currentTarget && dispatch(closeModal());

  if (!isVisible) return null;

  return reactDom.createPortal(
    <div
      className="absolute top-0 left-0 h-screen w-full backdrop-blur-sm mt-[8vh] flex justify-center z-20"
      onClick={handleClick}
    >
      {type === POST && <PostInputModal />}
      {type === PROFILE && <EditProfileModal />}
      {type === COVER && <EditCoverModal />}
    </div>,
    document.body
  );
};
