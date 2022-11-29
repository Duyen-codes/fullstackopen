import { useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

import { ALL_PERSONS, PERSON_ADDED } from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
	// helper that is used to eliminate saving same person twice
	const uniqByName = (a) => {
		let seen = new Set();
		return a.filter((item) => {
			let k = item.name;
			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, ({ allPersons }) => {
		return {
			allPersons: uniqByName(allPersons.concat(addedPerson)),
		};
	});
};

const App = () => {
	const [token, setToken] = useState(null); // when user is logged in, token state will contain a user token
	const [errorMessage, setErrorMessage] = useState(null);
	const result = useQuery(ALL_PERSONS);

	const client = useApolloClient();

	console.log("token in App.js", token);

	useSubscription(PERSON_ADDED, {
		onData: ({ data, client }) => {
			console.log(data);
			const addedPerson = data.data.personAdded;
			notify(`${addedPerson.name} added`);

			updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
		},
	});

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	if (result.loading) {
		return <div>loading...</div>;
	}

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	// if token is undefined, render LoginForm component for user login
	if (!token) {
		return (
			<>
				<Notify errorMessage={errorMessage} />
				<LoginForm setToken={setToken} setError={notify} />
			</>
		);
	}

	return (
		<>
			<Notify errorMessage={errorMessage} />
			<button onClick={logout}>logout</button>
			<Persons persons={result.data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm setError={notify} />
		</>
	);
};

export default App;

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}
	return <div style={{ color: "red" }}>{errorMessage}</div>;
};
