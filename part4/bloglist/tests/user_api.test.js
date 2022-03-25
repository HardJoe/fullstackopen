const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

const initialUsers = [
  {
    _id: '5a422a851b54a676234d17f7',
    username: 'dummy',
    name: 'Dummy Mcdumbdumb',
    password: 'so dumb',
    __v: 0,
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(initialUsers);
});

describe('post a user', () => {
  test('succeeds with valid data', async () => {
    const newUser = {
      username: 'bruh',
      name: 'Bruh Mcdumbdumb',
      password: 'so bruh',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/users');

    const usernames = response.body.map((r) => r.username);

    expect(response.body).toHaveLength(initialUsers.length + 1);
    expect(usernames).toContain('bruh');
  });

  test('fails with 400 if username is shorter than 3 chars', async () => {
    const newUser = {
      username: 'ww',
      name: 'Willy Wonka',
      password: 'so bruh',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toContain(
      'shorter than the minimum allowed length (3)'
    );
  });

  test('fails with 400 if username is not unique', async () => {
    const newUser = {
      username: 'dummy',
      name: 'Dumber Than You',
      password: 'so bruh',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toContain('username must be unique');
  });

  test('fails with 400 if password is shorter than 3 chars', async () => {
    const newUser = {
      username: 'adam',
      name: 'Adam Relu',
      password: 'so',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toContain('password must be 3 chars long');
  });

  test('fails with 400 if username or password is missing', async () => {
    const newUser = {
      username: 'adam',
      name: 'Adam Relu',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toContain('username and password are required');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
