import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBlog, updateBlog } from '../reducers/blogReducer';
import blogService from '../services/blogs';

const Blog = () => {
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const user = useSelector((state) => state.user);

  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  );

  useEffect(() => {
    if (blog) {
      setComments(blog.comments);
    }
  }, [blog]);

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

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    blogService.createComment(blog.id, { content: commentInput });
    setComments(comments.concat({ content: commentInput, id: 'uniqueId' }));
    setCommentInput('');
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
      <br />
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          id="comment-input"
          name="comment"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button type="submit">create</button>
      </form>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
