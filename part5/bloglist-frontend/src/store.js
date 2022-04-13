import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import memberReducer from './reducers/memberReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    members: memberReducer,
  },
});

export default store;
