import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MemberList = () => {
  const members = useSelector((state) => state.members);
  const sortedMembers = members
    .slice()
    .sort((a, b) => b.blogs.length - a.blogs.length);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {sortedMembers.map((m) => (
            <tr key={m.id}>
              <td>
                <Link to={`/users/${m.id}`}>{m.name}</Link>
              </td>
              <td>{m.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
