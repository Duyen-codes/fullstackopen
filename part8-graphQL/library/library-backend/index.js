const {
	ApolloServer,
	gql,
	UserInputError,
	AuthenticationError,
} = require("apollo-server");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "TOP_SECRET";

const mongoose = require("mongoose");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const MONGODB_URI =
	"mongodb+srv://libraryApp:libraryApp@cluster0.kcoos1o.mongodb.net/libraryApp?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connection to MongoDB: ", error.message);
	});

let authors = [
	{
		name: "Robert Martin",
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: "Martin Fowler",
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963,
	},
	{
		name: "Fyodor Dostoevsky",
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821,
	},
	{
		name: "Joshua Kerievsky", // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: "Sandi Metz", // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
];

let books = [
	{
		title: "Clean Code",
		published: 2008,
		author: "Robert Martin",
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Agile software development",
		published: 2002,
		author: "Robert Martin",
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ["agile", "patterns", "design"],
	},
	{
		title: "Refactoring, edition 2",
		published: 2018,
		author: "Martin Fowler",
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Refactoring to patterns",
		published: 2008,
		author: "Joshua Kerievsky",
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "patterns"],
	},
	{
		title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
		published: 2012,
		author: "Sandi Metz",
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "design"],
	},
	{
		title: "Crime and punishment",
		published: 1866,
		author: "Fyodor Dostoevsky",
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "crime"],
	},
	{
		title: "The Demon ",
		published: 1872,
		author: "Fyodor Dostoevsky",
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "revolution"],
	},
];

const typeDefs = gql`
	type Author {
		name: String!
		born: Int
		bookCount: Int
		id: ID!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	enum YesNo {
		YES
		NO
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		authorCount: Int!
		bookCount: Int!
		allAuthors(name: String, born: YesNo, bookCount: Int): [Author!]!
		allBooks(author: String, genre: String): [Book!]!
		me: User
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book!

		editAuthor(name: String!, setBornTo: Int!): Author

		createUser(username: String!, favoriteGenre: String!): User

		login(username: String!, password: String!): Token
	}
`;

const resolvers = {
	Query: {
		authorCount: async () => Author.collection.countDocuments(),
		bookCount: async () => Book.collection.countDocuments(),
		allAuthors: async () => {
			// let counter = [];
			// const bookLength = await Book.collection.countDocuments();
			// const books = await Book.find({}).populate("author", { name: 1 });

			// const authors = await Author.find({});

			// for (let i = 0; i < bookLength; i++) {
			// 	if (counter[books[i].author.name]) {
			// 		counter[books[i].author.name] += 1;
			// 	} else {
			// 		counter[books[i].author.name] = 1;
			// 	}
			// }

			// const reformattedArray = authors.map((author) => ({
			// 	id: author._id.toString(),
			// 	name: author.name,
			// 	born: author.born || null,
			// 	bookCount: counter[author.name] || 0,
			// }));

			// return reformattedArray;
			return Author.find({});
		},
		allBooks: async (root, args) => {
			console.log("args.genre", args.genre);
			if (!args.author && !args.genre) {
				return Book.find({}).populate("author", { name: 1 });
			}
			if (!args.author && args.genre) {
				const books = await Book.find({
					genres: { $in: [args.genre] },
				}).populate("author");
				console.log("books", books);
				return books;
			}
			if (args.author && !args.genre) {
				return Book.find({ author: { $in: [args.author] } });
			}
			if (args.author && args.genre) {
				return Book.find({
					author: { $in: [args.author] },
					genres: { $in: [args.genre] },
				});
			}
		},
		me: (root, args, context) => {
			return context.currentUser;
		},
	},
	Author: {
		bookCount: async (root) => {
			const booksByAuthor = await Book.find({ author: root.id });

			return booksByAuthor.length;
		},
	},

	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new AuthenticationError("not authenticated");
			}
			if (args.title.length < 2) {
				throw new UserInputError(
					"book title must be at least 2 character long",
				);
			}
			if (args.author.length < 4) {
				throw new UserInputError(
					"author name must be at least 4 character long",
				);
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

			const book = new Book({ ...args, author: author });

			try {
				await book.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
			console.log("book", book);
			return book;
		},

		editAuthor: async (root, args, { currentUser }) => {
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
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "secret") {
				throw new UserInputError("wrong credentials");
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, JWT_SECRET) };
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;

		if (auth && auth.toLowerCase().startsWith("bearer ")) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);

			const currentUser = await User.findById(decodedToken.id);
			console.log("currentUser", currentUser);
			return { currentUser };
		}
	},
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
