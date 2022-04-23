import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const genres = result.data.allGenres;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((a) => (
          <button
            key={a}
            value={a}
            onClick={(e) => getBooks({ variables: { genre: e.target.value } })}
          >
            {a}
          </button>
        ))}
        <button onClick={() => getBooks({ variables: { genre: null } })}>
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
