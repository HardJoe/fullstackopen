import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './index.css';
import { initializeBlogs } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { setUser } from './reducers/userReducer';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
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
      dispatch(setUser(returnedUser));
    } catch (err) {
      dispatch(setNotification('Wrong credentials.', 3, false));
    }
  };

  const removeStorage = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    window.location.reload(false);
  };

  if (!user) {
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
