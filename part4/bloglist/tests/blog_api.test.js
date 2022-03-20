const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
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

  test('missing title and url returns bad request', async () => {
    const newBlog = {
      url: 'http://www.bruh.com',
      likes: 420,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('update blogs', () => {
  test('succeeds if id and data is valid', async () => {
    const newBlog = {
      title: 'Why is Gitflow not Important?',
      author: 'Ahmad Irfan',
      url: 'http://www.irfaneveryday.com',
      likes: 69,
    };

    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);

    expect(titles).toContain('Why is Gitflow not Important?');
    expect(titles).not.toContain('React patterns');
  });

  test('fails with status code 400 if id is invalid', async () => {
    await api.put('/api/blogs/asd234').expect(400);
  });

  test('fails with status code 404 if blog is not found', async () => {
    await api.put('/api/blogs/123123123123123123123123').expect(404);
  });

  test('fails with status code 400 if data is invalid', async () => {
    const newBlog = {
      url: 'http://www.irfaneveryday.com',
      likes: 'aaa',
    };

    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send(newBlog)
      .expect(400);
  });
});

describe('delete blogs', () => {
  test('a valid blog can be deleted', async () => {
    await api.delete('/api/blogs/5a422a851b54a676234d17f7').expect(204);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length - 1);
  });

  test('invalid id returns bad request', async () => {
    await api.delete('/api/blogs/123123').expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
