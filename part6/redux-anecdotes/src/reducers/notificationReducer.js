import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const setNotification = (content, duration) => {
  return async (dispatch) => {
    dispatch(displayNotification(content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export const { displayNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
