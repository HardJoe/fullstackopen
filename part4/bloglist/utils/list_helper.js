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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
