import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, handleVoteClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVoteClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVoteClick={() => dispatch(vote(anecdote.id))}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
