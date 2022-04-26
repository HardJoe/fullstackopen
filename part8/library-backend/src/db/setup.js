const Author = require('../models/author');
const Book = require('../models/book');

let authors = [
  {
    name: 'Robert Martin',
    born: 1952,
    _id: '625f660c06ad37b4fb86a8a4',
  },
  {
    name: 'Martin Fowler',
    born: 1963,
    _id: '625f6639ebd8a63f3933a3cd',
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821,
    _id: '625f66413aa9eee88492b699',
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    _id: '625f6650adb4e0a774f73e12',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    _id: '625f665986a4eda5e0cbb37b',
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: '625f660c06ad37b4fb86a8a4',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: '625f660c06ad37b4fb86a8a4',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: '625f6639ebd8a63f3933a3cd',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: '625f6650adb4e0a774f73e12',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: '625f665986a4eda5e0cbb37b',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: '625f66413aa9eee88492b699',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon',
    published: 1872,
    author: '625f66413aa9eee88492b699',
    genres: ['classic', 'revolution'],
  },
];

const setup = async () => {
  await Author.deleteMany({});
  await Book.deleteMany({});
  console.log('connected to MongoDB');
  await Author.insertMany(authors);
  console.log('authors inserted');
  await Book.insertMany(books);
  console.log('books inserted');
};

module.exports = {
  setup,
};
