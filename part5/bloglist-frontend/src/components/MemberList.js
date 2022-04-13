import { useSelector } from 'react-redux';

const MemberList = () => {
  const members = useSelector((state) => state.members);
  console.log('members', members);
  const sortedMembers = members
    .slice()
    .sort((a, b) => b.blogs.length - a.blogs.length);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
        {sortedMembers.map((m) => (
          <tr key={m.id}>
            <td>{m.name}</td>
            <td>{m.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default MemberList;
