import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import ErrorMessage from './components/ErrorMessage';
import SuccessMessage from './components/SuccessMessage';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const showSuccessMessage = (content) => {
    setSuccessMessage(content);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const showErrorMessage = (content) => {
    setErrorMessage(content);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const login = async (userObject) => {
    try {
      const returnedUser = await loginService.login(userObject);
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(returnedUser)
      );
      blogService.setToken(returnedUser.token);
      setUser(returnedUser);
    } catch (err) {
      showErrorMessage('Wrong credentials');
    }
  };

  const removeStorage = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    window.location.reload(false);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      showSuccessMessage(
        `${returnedBlog.title} by ${returnedBlog.author} added`
      );

      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
    } catch (err) {
      showErrorMessage(err.response.data.error);
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      blogObject.user = blogObject.user.id;
      const returnedBlog = await blogService.update(blogObject.id, blogObject);
      showSuccessMessage(
        `${returnedBlog.title} by ${returnedBlog.author} updated`
      );
    } catch (err) {
      showErrorMessage(err.response.data.error);
    }
  };

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.deleteOne(blogObject.id);
      setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
      showSuccessMessage(`${blogObject.title} by ${blogObject.author} deleted`);
    } catch (err) {
      showErrorMessage(err.response.data.error);
    }
  };

  if (user === null) {
    return (
      <div>
        <SuccessMessage message={successMessage} />
        <ErrorMessage message={errorMessage} />

        <h2>Log in to application</h2>
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>

      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />

      <div>
        {user.name} logged in
        <button onClick={removeStorage}>logout</button>
      </div>

      <br />

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      <br />

      <div>
        {blogs
          .sort((a, b) => (a.likes > b.likes ? -1 : 1))
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
