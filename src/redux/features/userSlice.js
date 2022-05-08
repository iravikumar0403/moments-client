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
      localStorage.setItem("user", JSON.stringify(data.user));
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
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state = initialState;
    },
    loginFromLocal: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
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
    [signup.pending]: (state, action) => {
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
  },
});

export const { loginFromLocal, logout } = userSlice.actions;
export default userSlice.reducer;
