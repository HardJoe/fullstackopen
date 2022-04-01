import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.postOne(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updateAnecdote = ({ id, ...rest }) => {
  return async (dispatch) => {
    anecdoteService.putOne(id, rest);
    dispatch(vote(id));
  };
};

export const { appendAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
