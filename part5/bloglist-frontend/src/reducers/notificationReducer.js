import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    displayNotification(state, action) {
      state.push(action.payload);
    },
    clearNotification(state) {
      state.shift();
    },
  },
});

export const setNotification = (content, duration, success) => {
  return async (dispatch) => {
    dispatch(displayNotification({ content, success }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export const { displayNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
