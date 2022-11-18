const { ApolloServer, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");

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

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

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
	}

	type Book {
		title: String
		author: String
		published: Int
		genres: [String]
		id: ID!
	}

	enum YesNo {
		YES
		NO
	}

	type Query {
		authorCount: Int!
		bookCount: Int!
		allAuthors(name: String, born: YesNo, bookCount: Int): [Author]
		allBooks(author: String, genres: String): [Book]
	}

	type Mutation {
		addBook(
			title: String
			author: String
			published: Int
			genres: [String]
		): Book

		editAuthor(name: String!, setBornTo: Int!): Author
	}
`;

const resolvers = {
	Query: {
		authorCount: () => authors.length,
		bookCount: () => books.length,
		allAuthors: () => {
			let counter = [];
			for (let i = 0; i < books.length; i++) {
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
		allBooks: (root, args) => {
			if (!args.author && !args.genres) {
				return books;
			}
			if (!args.author && args.genres) {
				return books.filter((book) => book.genres.includes(args.genres));
			}
			if (args.author && !args.genres) {
				return books.filter((book) => book.author === args.author);
			}
			if (args.author && args.genres) {
				return books.filter(
					(book) =>
						book.author === args.author && book.genres.includes(args.genres),
				);
			}
		},
	},
	Mutation: {
		addBook: (root, args) => {
			const book = { ...args, id: uuid() };
			const author = { name: args.author, born: args.born || null, id: uuid() };
			books = books.concat(book);
			authors = authors.concat(author);
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
