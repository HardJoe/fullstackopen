const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
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
