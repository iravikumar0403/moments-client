import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadImage } from "utils/uploadImage";
import { toast } from "react-toastify";
import axios from "axios";
import { LATEST_FIRST } from "utils/constants";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  loading: false,
  explorePosts: [],
  feedPosts: [],
  bookmarks: [],
  sortBy: LATEST_FIRST,
  creatingPost: false,
  currentPost: null,
  commentLoading: false,
  error: null,
};

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (page = 0, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API_URL}/posts?page=${page}`
      );
      return data;
    } catch (error) {
      toast.error("Failed to fetch post");
      return rejectWithValue(error.message);
    }
  }
);

export const getFeedPosts = createAsyncThunk(
  "posts/getFeedPosts",
  async (page = 0, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API_URL}/posts/feed?page=${page}`
      );
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
      postData.images = await uploadImage(post.images);
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
      if (error.response.status === 401) toast.error("You are not logged in");
      return rejectWithValue(error.response.message);
    }
  }
);

export const bookmarkPost = createAsyncThunk(
  "posts/bookmark",
  async (post, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts/save/${post._id}`
      );
      return data;
    } catch (error) {
      if (error.response.status === 401) toast.error("You are not logged in");
      else toast.error("Something went wrong");
      return rejectWithValue(error.response.message);
    }
  }
);

export const getBookmarks = createAsyncThunk("posts/getBookmarks", async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/posts/bookmarks`
    );
    return data;
  } catch (error) {
    toast.error("Failed to fetch bookmarks");
  }
});

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ post_id, comment }, { rejectWithValue }) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/comments/${post_id}`,
        data: {
          content: comment,
        },
      });
      return data;
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error.response.message);
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (post_id, { rejectWithValue, getState }) => {
    try {
      const allPosts = [
        ...getState().posts.explorePosts,
        ...getState().posts.feedPosts,
      ];
      const currentPost = allPosts.find((post) => post._id === post_id);
      if (currentPost) {
        return currentPost;
      } else {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/posts/${post_id}`
        );
        return data;
      }
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error.response.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.explorePosts =
        state.explorePage === action.payload.page
          ? state.explorePosts
          : [...state.explorePosts, ...action.payload.posts];
      state.explorePage = action.payload.page;
      state.exploreHasMore = action.payload.has_more;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getFeedPosts.pending]: (state) => {
      state.loading = true;
    },
    [getFeedPosts.fulfilled]: (state, action) => {
      state.feedPosts =
        state.feedPage === action.payload.page
          ? state.feedPosts
          : [...state.feedPosts, ...action.payload.posts];
      state.feedHasMore = action.payload.has_more;
      state.feedPage = action.payload.page;
      state.loading = false;
    },
    [addPost.pending]: (state) => {
      state.creatingPost = true;
    },
    [addPost.fulfilled]: (state, action) => {
      state.feedPosts = [action.payload, ...state.feedPosts];
      state.explorePosts = [action.payload, ...state.explorePosts];
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
      state.feedPosts = [
        action.payload,
        ...state.feedPosts.filter((post) => post._id !== action.payload._id),
      ];
      state.explorePosts = [
        action.payload,
        ...state.explorePosts.filter((post) => post._id !== action.payload._id),
      ];
    },
    [deletePost.pending]: (state, action) => {
      state.feedPosts = state.feedPosts.filter(
        (post) => post._id !== action.meta.arg
      );
      state.explorePosts = state.explorePosts.filter(
        (post) => post._id !== action.meta.arg
      );
    },
    [likePost.pending]: (state, action) => {
      state.feedPosts = state.feedPosts.map((post) => {
        if (post._id === action.meta.arg.post_id) {
          post.likes.includes(action.meta.arg.user_id)
            ? post.likes.pop(action.meta.arg.user_id)
            : post.likes.push(action.meta.arg.user_id);
        }
        return post;
      });
      state.explorePosts = state.explorePosts.map((post) => {
        if (post._id === action.meta.arg.post_id) {
          post.likes.includes(action.meta.arg.user_id)
            ? post.likes.pop(action.meta.arg.user_id)
            : post.likes.push(action.meta.arg.user_id);
        }
        return post;
      });
    },
    [likePost.fulfilled]: (state, action) => {
      state.feedPosts = state.feedPosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.explorePosts = state.explorePosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.currentPost = action.payload;
    },
    [bookmarkPost.pending]: (state, action) => {
      if (
        state.bookmarks.find((bookmark) => bookmark._id === action.meta.arg._id)
      ) {
        state.bookmarks = state.bookmarks.filter(
          (bookmark) => bookmark._id !== action.meta.arg._id
        );
      } else {
        state.bookmarks = [...state.bookmarks, action.meta.arg];
      }
    },
    [bookmarkPost.fulfilled]: (state, action) => {
      state.bookmarks = action.payload;
    },
    [bookmarkPost.rejected]: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark._id !== action.meta.arg._id
      );
    },
    [getBookmarks.pending]: (state) => {
      state.loading = true;
    },
    [getBookmarks.fulfilled]: (state, action) => {
      state.loading = false;
      state.bookmarks = action.payload;
    },
    [getPostById.pending]: (state) => {
      state.loading = true;
    },
    [getPostById.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentPost = action.payload;
    },
    [addComment.pending]: (state) => {
      state.commentLoading = true;
    },
    [addComment.fulfilled]: (state, action) => {
      state.commentLoading = false;
      state.feedPosts = state.feedPosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.explorePosts = state.explorePosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.currentPost = action.payload;
    },
  },
});

export const { setSortBy } = postSlice.actions;
export default postSlice.reducer;
