import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    modifyBlog(state, action) {
      const id = action.payload.id;
      return state.map((b) => (b.id === id ? action.payload : b));
    },
    removeBlog(state, action) {
      const id = action.payload.id;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(`${blog.title} by ${blog.author} added.`, 3, true),
      );
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 3, false));
    }
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const blogToSend = { ...blog, user: blog.user.id };
      await blogService.update(blog.id, blogToSend);
      dispatch(modifyBlog(blog));
      dispatch(setNotification(`You liked "${blog.title}".`, 3, true));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 3, false));
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteOne(blog.id);
      dispatch(removeBlog(blog));
      dispatch(setNotification(`You removed "${blog.title}".`, 3, true));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 3, false));
    }
  };
};

export const { setBlogs, appendBlog, modifyBlog, removeBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
