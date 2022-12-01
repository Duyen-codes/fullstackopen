const { execute, subscribe } = require("graphql");

// WebSocket protocol provides a way to exchange data btw browser and server via a persistent connection
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const { gql, UserInputError, AuthenticationError } = require("apollo-server");

const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// load Express module
const express = require("express");

// load http module
const http = require("http");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "TOP_SECRET";

const mongoose = require("mongoose");

const User = require("./models/user");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

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

// start func

const start = async () => {
	const app = express();

	const httpServer = http.createServer(app);

	const schema = makeExecutableSchema({ typeDefs, resolvers });

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: "/",
	});

	const serverCleanup = useServer({ schema }, wsServer);
	// server

	const server = new ApolloServer({
		schema,
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null;
			console.log("authorization in context req", req.headers.authorization);

			if (auth && auth.toLowerCase().startsWith("bearer ")) {
				const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
				console.log("decodedToken", decodedToken);
				const currentUser = await User.findById(decodedToken.id);
				console.log("currentUser context", currentUser);
				return { currentUser };
			}
		}, // context ends

		plugins: [
			// Proper shutdown for the HTTP server.
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				// Proper shutdown for the WebSocket server.
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						},
					};
				},
			},
		],
	}); // server ends

	await server.start();

	server.applyMiddleware({
		app,
		path: "/",
	});

	const PORT = 4000;

	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${PORT}`),
	);
}; // start func ends

start();
