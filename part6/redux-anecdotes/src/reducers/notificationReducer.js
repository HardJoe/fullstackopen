import { createSlice } from '@reduxjs/toolkit';

const initialState = 'This is a notificaton';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
  },
});

export const { displayNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
