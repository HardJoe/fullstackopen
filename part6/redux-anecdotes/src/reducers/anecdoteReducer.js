import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push({ content, id: getId(), votes: 0 });
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
