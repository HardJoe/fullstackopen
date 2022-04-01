import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    props.createAnecdote(content);
    props.setNotification(`You added '${content}'`, 3);
  };

  return (
    <div>
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
