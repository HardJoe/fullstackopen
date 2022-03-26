const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogsRouter.post('', async (request, response) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch {
    response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    response.status(404).json({ error: 'user not found' });
  }

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
  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch {
    response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    response.status(404).json({ error: 'user not found' });
  }

  const blog = await Blog.findByIdAndRemove(request.params.id);
  if (!blog) {
    response.status(404).json({ error: 'blog not found' });
  }

  if (blog.user.toString() !== user._id) {
    response.status(403).json({ error: 'forbidden' });
  }

  user.blogs = user.blogs.filter((b) => b._id !== blog._id);
  await user.save();

  response.status(204).send();
});

module.exports = blogsRouter;
