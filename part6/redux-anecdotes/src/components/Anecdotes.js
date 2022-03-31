import { useDispatch, useSelector } from 'react-redux';
import { createAnecdote, vote } from '../reducers/anecdoteReducer';

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

const Anecdotes = () => {
  let anecdotes = useSelector((state) => state);
  anecdotes = anecdotes.sort(({ votes: a }, { votes: b }) => b - a);
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    dispatch(createAnecdote(content));
  };

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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default Anecdotes;
