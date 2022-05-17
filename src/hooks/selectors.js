import { useSelector } from "react-redux";

export const usePosts = () => useSelector((state) => state.posts);
export const useAuth = () => useSelector((state) => state.user);
export const useModal = () => useSelector((state) => state.modal);
export const useProfile = () => useSelector((state) => state.profile);
