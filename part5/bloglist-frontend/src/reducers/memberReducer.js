import { createSlice } from '@reduxjs/toolkit';
import memberService from '../services/members';

const memberSlice = createSlice({
  name: 'members',
  initialState: [],
  reducers: {
    setMembers(state, action) {
      return action.payload;
    },
  },
});

export const initializeMembers = () => {
  return async (dispatch) => {
    const members = await memberService.getAll();
    dispatch(setMembers(members));
  };
};

export const { setMembers } = memberSlice.actions;

export default memberSlice.reducer;
