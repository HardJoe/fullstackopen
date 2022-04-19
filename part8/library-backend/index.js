require('dotenv').config();
const { ApolloServer, UserInputError, gql } = require('apollo-server');
const { argsToArgsConfig } = require('graphql/type/definition');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const Author = require('./src/models/author');
const Book = require('./src/models/book');

let authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
  },
  {
    name: 'Sandi Metz', // birthyear not known
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
    // author: 'Robert Martin',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    // author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    // author: 'Martin Fowler',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    // author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    // author: 'Sandi Metz',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    // author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon',
    published: 1872,
    // author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.countDocuments(),
    bookCount: async () => Book.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      if (!(author || genre)) {
        return Book.find({});
      }
      return Book.find({ genres: { $in: [genre] } });
    },
    allAuthors: async () => Author.find({}),
  },
  // Author: {
  //   bookCount: (root) => books.filter((b) => b.author === root.name).length,
  // },
  Mutation: {
    addBook: async (root, args) => {
      const { author, ...bookArgs } = args;
      const book = new Book(bookArgs);
      const foundAuthor = await Author.find({ name: author });
      try {
        if (foundAuthor.length < 1) {
          const newAuthor = new Author({ name: author });
          await newAuthor.save();
        }
        return book.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, { name, setBornTo }) => {
      const filter = { name };
      const update = { born: setBornTo };
      const opts = { new: true };
      const authorToUpdate = await Author.findOneAndUpdate(
        filter,
        update,
        opts,
      );
      if (!authorToUpdate) {
        return null;
      }
      return authorToUpdate;
    },
  },
};

const MONGODB_URI = process.env.DEV_MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Author.deleteMany({});
    await Book.deleteMany({});
    console.log('connected to MongoDB');
    await Author.insertMany(authors);
    console.log('authors inserted');
    await Book.insertMany(books);
    console.log('books inserted');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
