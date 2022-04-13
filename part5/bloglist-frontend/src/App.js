import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import MemberList from './components/MemberList';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './index.css';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeMembers } from './reducers/memberReducer';
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
    dispatch(initializeMembers());
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

  const Home = () => (
    <div>
      <h2>Blogs</h2>
      <Notification />

      <div>
        <div>{user.name} logged in</div>
        <br />
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

  const Users = () => (
    <div>
      <h2>Blogs</h2>
      <Notification />

      <div>
        <div>{user.name} logged in</div>
        <br />
        <button onClick={removeStorage}>logout</button>
      </div>

      <MemberList />
    </div>
  );

  return (
    <Router>
      {/* <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>

      {/* <div>
        <i>Note app, Department of Computer Science 2022</i>
      </div> */}
    </Router>
  );
};

export default App;
