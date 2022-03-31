import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import {
  displayNotification,
  hideNotification,
} from '../reducers/notificationReducer';

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

  const handleVote = ({ id, content }) => {
    dispatch(vote(id));
    dispatch(displayNotification(`You voted '${content}'`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVoteClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
