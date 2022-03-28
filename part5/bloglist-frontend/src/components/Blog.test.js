import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders content when details are hidden', () => {
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

  const { container } = render(<Blog blog={blog} />);

  expect(container).toHaveTextContent('React patterns by Michael Chan');

  expect(container).not.toHaveTextContent('https://reactpatterns.com/');
  expect(container).not.toHaveTextContent('7');
});

test('clicking the button renders details', async () => {
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

  const { container } = render(<Blog blog={blog} user={user} />);

  const button = screen.getByText('view');
  userEvent.click(button);

  expect(container).toHaveTextContent('React patterns');
  expect(container).toHaveTextContent('Michael Chan');

  expect(container).toHaveTextContent('https://reactpatterns.com/');
  expect(container).toHaveTextContent('7');
});
