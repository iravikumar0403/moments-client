import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  loading: false,
  allPosts: [],
  error: null,
  userPost: [],
  creatingPost: false,
};

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${REACT_APP_API_URL}/posts`);
      return data;
    } catch (error) {
      toast.error("Failed to fetch post");
      return rejectWithValue(error.message);
    }
  }
);

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
  try {
    const postData = {
      content: post.content,
      images: [],
    };
    if (post.images) {
      const fileData = new FormData();
      fileData.append("file", post.images);
      fileData.append("upload_preset", "w1pwqcqw");
      const {
        data: { secure_url },
      } = await axios({
        transformRequest: [
          (data, headers) => {
            delete headers.common.Authorization;
            return data;
          },
        ],
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/moments-social/image/upload",
        data: fileData,
      });
      postData.images = [secure_url];
    }
    const { data } = await axios({
      url: `${REACT_APP_API_URL}/posts`,
      method: "POST",
      data: postData,
    });
    return data;
  } catch (error) {
    toast.error("Failed to post moment.");
  }
});

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/posts/${postData._id}`,
        data: {
          content: postData.content,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (post_id, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${post_id}`);
      toast.success("Post deleted!");
      return;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ post_id, user_id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts/like/${post_id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.allPosts = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addPost.pending]: (state) => {
      state.creatingPost = true;
    },
    [addPost.fulfilled]: (state, action) => {
      state.allPosts = [action.payload, ...state.allPosts];
      state.userPost = [action.payload, ...state.userPost];
      state.creatingPost = false;
    },
    [addPost.rejected]: (state) => {
      state.creatingPost = false;
    },
    [editPost.pending]: (state, action) => {
      state.creatingPost = true;
    },
    [editPost.fulfilled]: (state, action) => {
      state.creatingPost = false;
      state.allPosts = [
        action.payload,
        ...state.allPosts.filter((post) => post._id !== action.payload._id),
      ];
      state.userPost = [
        action.payload,
        ...state.userPost.filter((post) => post._id !== action.payload._id),
      ];
    },
    [deletePost.pending]: (state, action) => {
      state.allPosts = state.allPosts.filter(
        (post) => post._id !== action.meta.arg
      );
      state.userPost = state.userPost.filter(
        (post) => post._id !== action.meta.arg
      );
    },
    [likePost.pending]: (state, action) => {
      state.allPosts = state.allPosts.map((post) => {
        if (post._id === action.meta.arg.post_id) {
          post.likes.includes(action.meta.arg.user_id)
            ? post.likes.pop(action.meta.arg.user_id)
            : post.likes.push(action.meta.arg.user_id);
        }
        return post;
      });
      state.userPost = state.userPost.map((post) => {
        if (post._id === action.meta.arg.post_id) {
          post.likes.includes(action.meta.arg.user_id)
            ? post.likes.push(action.meta.arg.user_id)
            : post.likes.pop(action.meta.arg.user_id);
        }
        return post;
      });
    },
    [likePost.fulfilled]: (state, action) => {
      state.allPosts = state.allPosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.userPost = state.userPost.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
  },
});

export default postSlice.reducer;
