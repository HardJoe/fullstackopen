const { UserInputError, AuthenticationError } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const pubsub = new PubSub();
const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    authorCount: async () => Author.countDocuments(),
    bookCount: async () => Book.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      if (!(author || genre)) {
        return Book.find({}).populate('author');
      }
      return Book.find({ genres: { $in: [genre] } }).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
    allGenres: async () => {
      let genreSet = new Set();
      const books = await Book.find({});
      for (const book of books) {
        genreSet = new Set([...genreSet, ...book.genres]);
      }
      return Array.from(genreSet);
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const book = new Book(args);
      const author = args.author;
      const foundAuthor = await Author.findOne({ name: author });
      try {
        if (!foundAuthor) {
          const newAuthor = new Author({ name: author, bookCount: 1 });
          await newAuthor.save();
          book.author = newAuthor._id;
        } else {
          foundAuthor.bookCount += 1;
          await foundAuthor.save();
          book.author = foundAuthor._id;
        }
        await book.save();
        pubsub.publish('BOOK_ADDED', { bookAdded: book });
        return book;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, { name, setBornTo }, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

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
    createUser: async (root, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre });
      try {
        return user.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, JWT_SECRET),
      };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

module.exports = resolvers;
