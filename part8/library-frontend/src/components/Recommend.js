import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommend = (props) => {
  // https://atomizedobjects.com/blog/react/how-to-use-apollo-usequery-multiple-queries/

  const me = useQuery(ME);
  const allBooks = useQuery(ALL_BOOKS, {
    variables: { genre: me.data?.me?.favoriteGenre },
    skip: me.loading || !me.data?.me?.favoriteGenre,
  });

  if (!props.show) {
    return null;
  }

  const error = me.error || allBooks.error;
  const loading = me.loading || allBooks.loading;

  if (loading) {
    return <div>loading...</div>;
  }

  const favGenre = me.data?.me?.favoriteGenre;
  const books = allBooks.data?.allBooks;

  return (
    <div>
      {<h3 style={{ color: 'red' }}>{error}</h3>}

      <h2>recommendations</h2>

      <p>
        books in your favorite genre <strong>{favGenre}</strong>
      </p>

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
    </div>
  );
};

export default Recommend;
