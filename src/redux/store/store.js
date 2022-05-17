import { configureStore } from "@reduxjs/toolkit";
import userReducer from "redux/features/userSlice";
import postReducer from "redux/features/postSlice";
import modalReducer from "redux/features/modalSlice";
import profileReducer from "redux/features/profileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    modal: modalReducer,
    profile: profileReducer,
  },
});
