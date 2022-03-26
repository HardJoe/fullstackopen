const blogsRouter = require('express').Router();
const middleware = require('../utils/middleware');
const userExtractor = middleware.userExtractor;
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogsRouter.post('', userExtractor, async (request, response) => {
  const decodedToken = request.user;

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

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const decodedToken = request.user;

  const user = await User.findById(decodedToken.id);
  if (!user) {
    response.status(404).json({ error: 'user not found' });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    response.status(404).json({ error: 'blog not found' });
  }

  if (blog.user.toString() !== user._id.toString()) {
    response.status(403).json({ error: 'forbidden' });
    return;
  }

  user.blogs = user.blogs.filter((b) => b._id !== blog._id);
  await user.save();

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

module.exports = blogsRouter;
