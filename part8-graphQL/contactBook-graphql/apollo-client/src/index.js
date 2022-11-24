import ReactDOM from "react-dom/client";
import App from "./App";
import { setContext } from "@apollo/client/link/context";

import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
	gql,
} from "@apollo/client";

// create a new client object, which is then used to send a query to the server
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: "http://localhost:4000",
	}),
});

const query = gql`
	query {
		allPersons {
			name
			phone
			address {
				street
				city
			}
			id
		}
	}
`;

client.query({ query }).then((response) => {
	console.log(response.data);
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
);
