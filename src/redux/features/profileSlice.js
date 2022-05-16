const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const { toast } = require("react-toastify");

const initialState = {
  userProfile: null,
  userPosts: [],
  loading: false,
  postLoading: false,
};

export const getUserByUsername = createAsyncThunk(
  "profile/getUserByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${username}`
      );
      console.log(data);
      return data;
    } catch (error) {
      toast.error("Something went wrong");
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
  },
});

export default profileSlice.reducer;
