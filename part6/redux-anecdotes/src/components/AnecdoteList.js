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
  let anecdotes = useSelector((state) => state);
  anecdotes = anecdotes.sort(({ votes: a }, { votes: b }) => b - a);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
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
