const { gql } = require("apollo-server");

const typeDefs = gql`
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Author {
		name: String!
		born: Int
		bookCount: Int
		id: ID!
	}

	type Book {
		title: String!
		published: Int
		author: Author!
		genres: [String!]
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
		allBooks(author: String, genre: String): [Book!]!
		me: User
	}

	type Mutation {
		addBook(
			title: String!
			published: Int
			author: String!
			genres: [String!]
		): Book

		editAuthor(name: String!, setBornTo: Int!): Author

		createUser(username: String!, favoriteGenre: String!): User

		login(username: String!, password: String!): Token
	}

	type Subscription {
		bookAdded: Book!
	}
`;

module.exports = typeDefs;
