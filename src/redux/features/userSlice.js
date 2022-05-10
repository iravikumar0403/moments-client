import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  user: null,
};

const { REACT_APP_API_URL } = process.env;

export const login = createAsyncThunk(
  "user/login",
  async (creds, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${REACT_APP_API_URL}/auth/login`, {
        ...creds,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (userdetails, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${REACT_APP_API_URL}/auth/signup`, {
        ...userdetails,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const savePost = createAsyncThunk(
  "posts/savePost",
  async ({ post_id, user_id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts/save/${post_id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
    },
    loginFromLocal: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [signup.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [savePost.pending]: (state, action) => {
      state.user.saved.includes(action.meta.arg.post_id)
        ? state.user.saved.pop(action.meta.arg.post_id)
        : state.user.saved.push(action.meta.arg.post_id);
    },
    [savePost.fulfilled]: (state, action) => {
      state.user.saved = action.payload.saved;
    },
  },
});

export const { loginFromLocal, logout } = userSlice.actions;
export default userSlice.reducer;
