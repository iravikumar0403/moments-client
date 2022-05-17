const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const { toast } = require("react-toastify");

const initialState = {
  userProfile: null,
  userPosts: [],
  loading: false,
};

export const getUserByUsername = createAsyncThunk(
  "profile/getUserByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${username}`
      );
      return data;
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error.response.message);
    }
  }
);

export const getPostsByUser = createAsyncThunk(
  "profile/getPostsByUser",
  async (user_id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/posts/${user_id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const followUser = createAsyncThunk(
  "profile/followUser",
  async (user_id, { rejectWithValue }) => {
    try {
      const { data } = await axios.post({
        url: `${process.env.REACT_APP_API_URL}/user/follow`,
        data: { user_to_follow: user_id },
      });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: {
    [getUserByUsername.pending]: (state) => {
      state.loading = true;
    },
    [getUserByUsername.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
      state.loading = false;
    },
    [getPostsByUser.fulfilled]: (state, action) => {
      state.userPosts = action.payload;
    },
    [followUser.pending]: (state, action) => {},
  },
});

export default profileSlice.reducer;
