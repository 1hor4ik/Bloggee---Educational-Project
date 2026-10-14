import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios";

export const getAllPosts = createAsyncThunk(
  "posts/getAll",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/posts/getAll");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getLatestTags = createAsyncThunk(
  "posts/getLatestTags",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/posts/getLatestTags");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  axios.delete(`/posts/delete/${id}`);
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state, action) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(getLatestTags.pending, (state, action) => {
        state.tags.items = [];
        state.tags.status = "loading";
      })
      .addCase(getLatestTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = "loaded";
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "rejected";
      })
      .addCase(deletePost.pending, (state, action) => {
        state.posts.items = state.posts.items.filter(
          (item) => item._id !== action.meta.arg
        );
      });
  },
});

export default postSlice.reducer;
