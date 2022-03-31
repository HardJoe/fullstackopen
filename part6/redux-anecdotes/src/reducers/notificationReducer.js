import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    hideNotification() {
      return null;
    },
  },
});

export const { displayNotification, hideNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
