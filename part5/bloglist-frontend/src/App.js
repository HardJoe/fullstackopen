import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './index.css';
import { initializeBlogs } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();
  const hideBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  const login = async (userObject) => {
    try {
      const returnedUser = await loginService.login(userObject);
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(returnedUser),
      );
      blogService.setToken(returnedUser.token);
      setUser(returnedUser);
    } catch (err) {
      dispatch(setNotification('Wrong credentials.', 3, false));
    }
  };

  const removeStorage = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    window.location.reload(false);
  };

  const updateBlog = async (blogObject) => {
    try {
      blogObject.user = blogObject.user.id;
      await blogService.update(blogObject.id, blogObject);
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 3, false));
    }
  };

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.deleteOne(blogObject.id);
      setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
      setNotification(
        `${blogObject.title} by ${blogObject.author} deleted.`,
        3,
        true,
      );
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 3, false));
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      <div>
        {user.name} logged in
        <button onClick={removeStorage}>logout</button>
      </div>

      <br />

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm hideBlogForm={hideBlogForm} />
      </Togglable>

      <br />

      <div className="blog-list">
        <BlogList user={user} />
      </div>
    </div>
  );
};

export default App;
