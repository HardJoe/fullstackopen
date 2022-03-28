import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
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
