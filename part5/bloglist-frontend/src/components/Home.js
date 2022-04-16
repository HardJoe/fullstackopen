import { useRef } from 'react';
import BlogForm from './BlogForm';
import BlogList from './BlogList';
import Togglable from './Togglable';

const Home = () => {
  const blogFormRef = useRef();
  const hideBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm hideBlogForm={hideBlogForm} />
      </Togglable>

      <div className="blog-list">
        <BlogList />
      </div>
    </div>
  );
};

export default Home;
