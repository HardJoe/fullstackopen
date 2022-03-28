import { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
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
    <div style={blogStyle}>
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
    </div>
  );
};

export default Blog;
