import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Member = () => {
  const { id } = useParams();

  const member = useSelector((state) =>
    state.members.find((member) => member.id === id),
  );

  if (!member) {
    return null;
  }

  return (
    <div>
      <h2>{member.name}</h2>

      <h3>Added blogs</h3>

      <ul>
        {member.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Member;
