import ReactDOM from "react-dom/client";
import App from "./App";

import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
	split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("phonenumbers-user-token");
	console.log("token from Index.js", token);
	return {
		headers: {
			...headers,
			authorization: token ? `bearer ${token}` : null,
		},
	};
});

const httpLink = new HttpLink({
	uri: "http://localhost:4000/graphql",
	options: { reconnect: true },
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: "ws://localhost:4000",
	}),
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	authLink.concat(httpLink),
);

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink,
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
);
