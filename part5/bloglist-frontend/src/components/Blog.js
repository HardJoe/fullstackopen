import { useState } from 'react';

const Blog = ({ key, blog }) => {
  const [viewed, setViewed] = useState(false);

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

  if (!viewed) {
    return (
      <div style={blogStyle}>
        {blog.title} by {blog.author}
        <button value={key} onClick={handleViewClick}>
          view
        </button>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button value={key} onClick={handleViewClick}>
          hide
        </button>
      </div>
      {blog.url}
      <div>
        likes {blog.likes} <button>like</button>
      </div>
      {blog.author}
    </div>
  );
};

export default Blog;
