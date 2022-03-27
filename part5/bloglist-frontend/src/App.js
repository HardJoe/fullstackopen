import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import ErrorMessage from './components/ErrorMessage';
import SuccessMessage from './components/SuccessMessage';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const showSuccessMessage = (content) => {
    setSuccessMessage(content);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const showErrorMessage = (content) => {
    setErrorMessage(content);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      showErrorMessage('Wrong credentials');
    }
  };

  const removeStorage = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    window.location.reload(false);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = { title, author, url };
    try {
      const res = await blogService.create(newBlog);
      setBlogs(blogs.concat(res));
      showSuccessMessage(`${res.title} by ${res.author} added`);
    } catch (err) {
      showErrorMessage(err.message);
    }
  };

  const blogForm = () => (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author:
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url:
          <input
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );

  if (user === null) {
    return (
      <div>
        <SuccessMessage message={successMessage} />
        <ErrorMessage message={errorMessage} />

        <h2>Log in to application</h2>
        {loginForm()}
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

      {blogForm()}

      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
