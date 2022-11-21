const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { v1: uuid } = require("uuid");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "TOP_SECRET";

const mongoose = require("mongoose");

const Book = require("./models/book");
const Author = require("./models/author");

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
		author: Author
		genres: [String!]!
		id: ID!
	}

	enum YesNo {
		YES
		NO
	}

	type Query {
		authorCount: Int!
		bookCount: Int!
		allAuthors(name: String, born: YesNo, bookCount: Int): [Author!]!
		allBooks(author: String, genres: String): [Book!]!
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book!

		editAuthor(name: String!, setBornTo: Int!): Author
	}
`;

const resolvers = {
	Query: {
		authorCount: async () => Author.collection.countDocuments(),
		bookCount: async () => Book.collection.countDocuments(),
		allAuthors: async () => {
			let counter = [];
			const bookLength = await Book.collection.countDocuments();
			const books = await Book.find({});
			const authors = await Author.find({});
			for (let i = 0; i < bookLength; i++) {
				if (counter[books[i].author]) {
					counter[books[i].author] += 1;
				} else {
					counter[books[i].author] = 1;
				}
			}

			const reformattedArray = authors.map((author) => ({
				...author,
				bookCount: counter[author.name],
			}));
			return reformattedArray;
		},
		allBooks: async (root, args) => {
			if (!args.author && !args.genres) {
				return Book.find({});
			}
			if (!args.author && args.genres) {
				return Book.find({ genres: { $in: [args.genres] } });
			}
			if (args.author && !args.genres) {
				return Book.find({ author: { $in: [args.author] } });
			}
			if (args.author && args.genres) {
				return Book.find({
					author: { $in: [args.author] },
					genres: { $in: [args.genres] },
				});
			}
		},
	},
	Mutation: {
		addBook: async (root, args) => {
			const book = new Book({ ...args });
			const author = { name: args.author, born: args.born || null };
			if (book.title.length < 2) {
				throw new UserInputError(
					"book title must be at least 2 character long",
				);
			}
			if (author.name.length < 4) {
				throw new UserInputError(
					"author name must be at least 4 character long",
				);
			}
			try {
				await book.save();
				await author.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
			return book;
		},

		editAuthor: (root, args) => {
			const author = authors.find((author) => author.name === args.name);
			if (!author) {
				return null;
			}
			const updatedAuthor = { ...author, born: args.setBornTo };
			authors = authors.map((author) =>
				author.name === args.name ? updatedAuthor : author,
			);
			return updatedAuthor;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
