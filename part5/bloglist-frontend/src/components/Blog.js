import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBlog, updateBlog } from '../reducers/blogReducer';

const Blog = () => {
  const user = useSelector((state) => state.user);

  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  );

  const dispatch = useDispatch();

  const handleLikeClick = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(updateBlog(likedBlog));
  };

  const navigate = useNavigate();

  const handleRemoveClick = () => {
    const isConfirmed = window.confirm(
      `Remove ${blog.title} by ${blog.author}?`,
    );
    if (isConfirmed) {
      dispatch(deleteBlog(blog));
      navigate('/');
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button id="like-button" onClick={handleLikeClick}>
          like
        </button>
      </div>
      added by {blog.user.name}
      <br />
      {user.username === blog.user.username ? (
        <button onClick={handleRemoveClick}>remove</button>
      ) : null}
    </div>
  );
};

export default Blog;
