import { Box, Button, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = ({ hideBlogForm }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }));

    hideBlogForm();
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <Typography variant="h5">Create New Blog</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <Typography variant="body2">title:</Typography>
          <TextField
            id="title-input"
            name="title"
            placeholder="My Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <Typography variant="body2">author:</Typography>
          <TextField
            id="author-input"
            name="author"
            placeholder="Author Aurora"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <Typography variant="body2">url:</Typography>
          <TextField
            id="url-input"
            name="url"
            placeholder="url.com"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <Box mt={1} pt={1}>
          <Button variant="contained" color="primary" type="submit">
            create
          </Button>
        </Box>
      </form>
    </div>
  );
};

BlogForm.displayName = 'BlogForm';

export default BlogForm;
