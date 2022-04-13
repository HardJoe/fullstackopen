import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = ({ updateBlog, deleteBlog, user }) => {
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default BlogList;
