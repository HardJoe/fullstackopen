import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [viewed, setViewed] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
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
    setLikes(likes + 1);
    const updatedBlog = { ...blog, likes: likes + 1 };
    updateBlog(updatedBlog);
    dispatch(setNotification(`You liked "${updatedBlog.title}".`, 3, true));
  };

  const handleRemoveClick = () => {
    const isConfirmed = window.confirm(
      `Remove ${blog.title} by ${blog.author}?`,
    );
    if (isConfirmed) {
      deleteBlog(blog);
      dispatch(setNotification(`You removed "${blog.title}".`, 3, true));
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
        likes {likes}
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
