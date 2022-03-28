import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

let container;
let updateBlog;

beforeEach(() => {
  const blog = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      id: '623fe6e2e41511ec21543037',
      username: 'jmay',
      name: 'James May',
    },
  };

  const user = {
    username: 'jmay',
    name: 'James May',
    token: 'thisisatoken',
  };

  updateBlog = jest.fn();

  container = render(
    <Blog blog={blog} updateBlog={updateBlog} user={user} />
  ).container;
});

test('renders content when details are hidden', () => {
  expect(container).toHaveTextContent('React patterns by Michael Chan');

  expect(container).not.toHaveTextContent('https://reactpatterns.com/');
  expect(container).not.toHaveTextContent('7');
});

test('clicking the button renders details', async () => {
  const button = screen.getByText('view');
  userEvent.click(button);

  expect(container).toHaveTextContent('React patterns');
  expect(container).toHaveTextContent('Michael Chan');

  expect(container).toHaveTextContent('https://reactpatterns.com/');
  expect(container).toHaveTextContent('7');
});

test('clicking the button twice calls event handler twice', async () => {
  let button = screen.getByText('view');
  userEvent.click(button);

  button = screen.getByText('like');
  userEvent.click(button);
  userEvent.click(button);

  expect(updateBlog.mock.calls).toHaveLength(2);
});
