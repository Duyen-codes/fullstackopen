const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const { UserInputError, AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "TOP_SECRET";

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const resolvers = {
	Query: {
		authorCount: async () => Author.collection.countDocuments(),

		bookCount: async () => Book.collection.countDocuments(),

		allAuthors: async () => {
			console.log("QUERY allAuthors");
			const authors = await Author.find({});
			console.log("authors", authors);
			const authorsWithBooks = await Author.find({}).populate("books");
			console.log("authorsWithBooks", authorsWithBooks);

			return authorsWithBooks;
		},

		allBooks: async (root, args) => {
			console.log("args.genre", args.genre);

			if (!args.author && !args.genre) {
				return Book.find({}).populate("author");
			}

			if (!args.author && args.genre) {
				const books = await Book.find({
					genres: { $in: [args.genre] },
				}).populate("author");
				console.log("books", books);
				return books;
			}

			if (args.author && !args.genre) {
				return Book.find({ author: { $in: [args.author] } }).populate("author");
			}

			if (args.author && args.genre) {
				return Book.find({
					author: { $in: [args.author] },
					genres: { $in: [args.genre] },
				}).populate("author");
			}
		},

		// resolver for me query
		me: (root, args, context) => {
			console.log("args in me", args);
			console.log("context in me", context);
			console.log("context.currentUser in me", context.currentUser);
			return context.currentUser;
		},
	}, // end of Query

	Author: {
		bookCount: (root) => {
			console.log("root in Author bookCount", root);

			const booksByAuthor = root.books.length;

			console.log("booksByAuthor", booksByAuthor);
			return booksByAuthor;
		},
	},

	// Mutation starts
	Mutation: {
		// resolver for addBook
		addBook: async (root, args, context) => {
			console.log("addBook args", args);

			const currentUser = context.currentUser;

			console.log("currentUser", currentUser);

			if (!currentUser) {
				throw new AuthenticationError("not authenticated");
			}

			let author = await Author.findOne({ name: args.author });

			if (!author) {
				const newAuthor = new Author({ name: args.author });

				try {
					author = await newAuthor.save();
					console.log("author", author);
				} catch (error) {
					throw new UserInputError(error.message, {
						invalidArgs: args,
					});
				}
			}

			const book = new Book({ ...args, author });
			console.log("book in addBook resolvers", book);

			try {
				await book.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}

			pubsub.publish("BOOK_ADDED", { bookAdded: book });

			console.log("book before return", book);
			return book;
		},

		editAuthor: async (root, args, { currentUser }) => {
			console.log("currentUser in editAuthor", currentUser);

			if (!currentUser) {
				throw new AuthenticationError("not authenticated");
			}

			const author = await Author.findOne({ name: args.name });
			if (!author) {
				return null;
			}

			author.born = args.setBornTo;
			try {
				await author.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
			return author;
		},

		// resolver of createUser mutation
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			});
			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		// resolver of login mutation
		login: async (root, args) => {
			console.log("args in login", args);
			const user = await User.findOne({ username: args.username });

			console.log("user", user);

			if (!user || args.password !== "secret") {
				throw new UserInputError("wrong credentials");
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			console.log("userForToken", userForToken);
			return { value: jwt.sign(userForToken, JWT_SECRET) };
		},
	}, // Mutation ends

	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
		},
	},
};

module.exports = resolvers;
