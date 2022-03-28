import { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [viewed, setViewed] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

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
    blog.likes += 1;
    updateBlog(blog);
  };

  const handleRemoveClick = () => {
    const isConfirmed = window.confirm(
      `Remove ${blog.title} by ${blog.author}?`
    );
    if (isConfirmed) {
      deleteBlog(blog);
    }
  };

  if (!viewed) {
    return (
      <div style={blogStyle}>
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
        likes {likes} <button onClick={handleLikeClick}>like</button>
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
