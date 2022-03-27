const bcrypt = require('bcrypt');
const supertest = require('supertest');

const app = require('../app');
const api = supertest(app);

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '623fe6e2e41511ec21543037',
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '623fe6e2e41511ec21543037',
    __v: 0,
  },
];

const initialUsers = [
  {
    _id: '623fe6e2e41511ec21543037',
    username: 'jmay',
    name: 'James May',
    passwordHash: bcrypt.hashSync('topgear', 10),
    blogs: ['5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8'],
  },
];

const getToken = async (username, password) => {
  const loginInfo = { username, password };
  const response = await api.post('/api/login').send(loginInfo);
  return response.body.token;
};

module.exports = {
  initialBlogs,
  initialUsers,
  getToken,
};
