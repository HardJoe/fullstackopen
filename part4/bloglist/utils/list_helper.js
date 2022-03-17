const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else {
    const max = blogs.reduce((prev, cur) =>
      prev.likes > cur.likes ? prev : cur
    );
    const { _id, url, __v, ...res } = max;
    return res;
  }
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: undefined,
      blogs: 0,
    };
  }

  const grouped = _(blogs)
    .groupBy('author')
    .map((author, name) => ({
      author: name,
      blogs: _.size(author),
    }))
    .value();
  return _.maxBy(grouped, 'blogs');
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: undefined,
      likes: 0,
    };
  }

  const grouped = _(blogs)
    .groupBy('author')
    .map((author, name) => ({
      author: name,
      likes: _.sumBy(author, 'likes'),
    }))
    .value();
  return _.maxBy(grouped, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
