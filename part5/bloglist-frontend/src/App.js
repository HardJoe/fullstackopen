import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Member from './components/Member';
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

      <br />

      <div className="blog-list">
        <BlogList />
      </div>
    </div>
  );
};

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
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

  const navbar = {
    backgroundColor: '#bfbfbf',
  };

  const padding = {
    paddingRight: 5,
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
    <>
      <div style={navbar}>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <span style={padding}>
          <b>{user.name} logged in</b>
        </span>
        <button onClick={removeStorage}>logout</button>
      </div>

      <h2>Blog App</h2>
      <Notification />

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/users" element={<MemberList />} />
        <Route path="/users/:id" element={<Member />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>

      {/* <div>
        <i>Note app, Department of Computer Science 2022</i>
      </div> */}
    </>
  );
};

export default App;
