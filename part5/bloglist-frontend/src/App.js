import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Member from './components/Member';
import MemberList from './components/MemberList';
import Notification from './components/Notification';
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

  const margin = {
    margin: 5,
  };

  if (!user) {
    return (
      <Container>
        <Notification />
        <LoginForm login={login} />
      </Container>
    );
  }

  return (
    <Container>
      <Container>
        <AppBar position="static" style={margin}>
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
            <Typography variant="body1" style={margin}>
              <b>{user.name} logged in</b>
            </Typography>
            <Button
              variant="contained"
              color="error"
              style={margin}
              onClick={removeStorage}
            >
              logout
            </Button>
          </Toolbar>
        </AppBar>
      </Container>

      <Container>
        <Notification />
        <Typography variant="h3" style={margin}>
          BLOG APP
        </Typography>
      </Container>

      <Container>
        <Routes style={margin}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<MemberList />} />
          <Route path="/users/:id" element={<Member />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Container>

      <Container style={margin}>
        <Typography variant="caption">© 2022 Joe Hartman</Typography>
      </Container>
    </Container>
  );
};

export default App;
