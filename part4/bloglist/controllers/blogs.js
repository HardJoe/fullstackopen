const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.post('', async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog(request.body);
  blog.user = user._id;
  const result = await blog.save();

  user.blogs = user.blogs.concat(blog._id);
  await user.save();

  response.status(201).json(result);
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body;
  const opt = { new: true };
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, opt);
  if (result) {
    response.json(result);
  } else {
    response.status(404).json({ error: 'blog not found' });
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id);
  if (result) {
    response.status(204).end();
  } else {
    response.status(404).json({ error: 'blog not found' });
  }
});

module.exports = blogsRouter;
