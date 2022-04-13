import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog, updateBlog } from '../reducers/blogReducer';

const Blog = ({ blog, user }) => {
  const [viewed, setViewed] = useState(false);

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleViewClick = () => {
    setViewed(!viewed);
  };

  const handleLikeClick = () => {
    const likedBlog = { ...blog, user: user.id, likes: blog.likes + 1 };
    dispatch(updateBlog(likedBlog));
  };

  const handleRemoveClick = () => {
    const isConfirmed = window.confirm(
      `Remove ${blog.title} by ${blog.author}?`,
    );
    if (isConfirmed) {
      dispatch(deleteBlog(blog));
    }
  };

  if (!viewed) {
    return (
      <div className="general-blog" style={blogStyle}>
        {blog.title} by {blog.author}
        <button value={blog._id} onClick={handleViewClick}>
          view
        </button>
      </div>
    );
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title}
        <button value={blog.id} onClick={handleViewClick}>
          hide
        </button>
      </div>
      {blog.url}
      <div>
        likes {blog.likes}
        <button id="like-button" onClick={handleLikeClick}>
          like
        </button>
      </div>
      {blog.author}
      <br />
      {user.username === blog.user.username ? (
        <button onClick={handleRemoveClick}>remove</button>
      ) : null}
    </div>
  );
};

export default Blog;
