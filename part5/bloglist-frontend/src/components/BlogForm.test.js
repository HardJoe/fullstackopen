import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

let addBlog;

beforeEach(() => {
  addBlog = jest.fn();

  render(<BlogForm addBlog={addBlog} />).container;
});

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const titleInput = screen.getByPlaceholderText('My Title');
  const authorInput = screen.getByPlaceholderText('Author Aurora');
  const urlInput = screen.getByPlaceholderText('url.com');
  const createButton = screen.getByRole('button');

  userEvent.type(titleInput, 'My Adventure');
  userEvent.type(authorInput, 'Indiana Jones');
  userEvent.type(urlInput, 'natgeo.com');
  userEvent.click(createButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('My Adventure');
  expect(addBlog.mock.calls[0][0].author).toBe('Indiana Jones');
  expect(addBlog.mock.calls[0][0].url).toBe('natgeo.com');
});
