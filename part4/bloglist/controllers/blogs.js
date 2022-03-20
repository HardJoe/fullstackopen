const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('', async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body;
  const opt = { new: true };

  try {
    result = await Blog.findByIdAndUpdate(request.params.id, blog, opt);
    if (result) {
      response.json(result);
    } else {
      response.status(404).json({ error: 'blog not found' });
    }
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
