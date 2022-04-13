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
    like(state, action) {
      const id = action.payload;
      const oldBlog = state.find((a) => a.id === id);
      const updatedBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
      return state.map((a) => (a.id === id ? updatedBlog : a));
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

export const updateBlog = ({ id, ...rest }) => {
  return async (dispatch) => {
    await blogService.update(id, rest);
    dispatch(vote(id));
  };
};

export const { appendBlog, vote, setBlogs } = blogSlice.actions;

export default blogSlice.reducer;
