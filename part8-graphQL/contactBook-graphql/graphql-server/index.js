// const { ApolloServer } = require("apollo-server");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const http = require("http");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "TOP_SECRET";

const mongoose = require("mongoose");

const User = require("./models/user");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const MONGODB_URI =
	"mongodb+srv://contactBook:contactBook@cluster0.iespfz5.mongodb.net/contactBook?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connection to MongoDB:", error.message);
	});

let persons = [
	{
		name: "Arto Hellas",
		phone: "040-123543",
		street: "Tapiolankatu 5 A",
		city: "Espoo",
		id: "3d594650-3436-11e9-bc57-8b80ba54c431",
	},
	{
		name: "Matti Luukkainen",
		phone: "040-432342",
		street: "Malminkaari 10 A",
		city: "Helsinki",
		id: "3d599470-3436-11e9-bc57-8b80ba54c431",
	},
	{
		name: "Venla Ruuska",
		street: "Nallemäentie 22 C",
		city: "Helsinki",
		id: "3d599471-3436-11e9-bc57-8b80ba54c431",
	},
];

const start = async () => {
	const app = express();
	const httpServer = http.createServer(app);

	const schema = makeExecutableSchema({ typeDefs, resolvers });

	const server = new ApolloServer({
		schema,
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null;
			console.log("authorization", req.headers.authorization);

			if (auth && auth.toLowerCase().startsWith("bearer ")) {
				const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
				const currentUser = await User.findById(decodedToken.id).populate(
					"friends",
				);
				console.log("currentUser context", currentUser);
				return { currentUser };
			}
		},
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});
	await server.start();

	server.applyMiddleware({
		app,
		path: "/",
	});

	const PORT = 4000;

	httpServer.listen(PORT, () => {
		console.log(`Server is now running on http://localhost:${PORT}`);
	});
};

// call the function that does the setup and starts the server
start();
// server.listen().then(({ url }) => {
// 	console.log(`Server ready at ${url}`);
// });
