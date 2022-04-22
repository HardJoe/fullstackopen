import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const SetBirthYear = (props) => {
  const [name, setName] = useState('Robert Martin');
  const [born, setBorn] = useState('');

  const [setBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const authors = props.authors;

  const submit = async (event) => {
    event.preventDefault();

    const setBornTo = born;
    setBirthYear({ variables: { name, setBornTo } });

    setName('Robert Martin');
    setBorn('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthYear;
