const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

describe('get blogs', () => {
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('blog id is defined', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('post blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Why is TDD Important?',
      author: 'Ahmad Ghozali',
      url: 'http://www.ghozalieveryday.com',
      likes: 1,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain('Why is TDD Important?');
  });

  test('missing likes defaults to 0 likes', async () => {
    const newBlog = {
      title: 'No likes?',
      author: 'Victor Azalea',
      url: 'http://www.victor.com',
    };

    await api.post('/api/blogs').send(newBlog);

    const response = await api.get('/api/blogs');

    const lastBlog = response.body[response.body.length - 1];

    expect(lastBlog.likes).toBe(0);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
