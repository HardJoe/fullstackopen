import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    vote(state, action) {
      const id = action.payload;
      const oldAnecdote = state.find((a) => a.id === id);
      const updatedAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 };
      return state.map((a) => (a.id === id ? updatedAnecdote : a));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
