import { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

import { ALL_PERSONS } from "./queries";

const App = () => {
	const [token, setToken] = useState(null); // when user is logged in, token state will contain a user token
	const [errorMessage, setErrorMessage] = useState(null);
	const result = useQuery(ALL_PERSONS);

	const client = useApolloClient();

	console.log("token in App.js", token);
	if (result.loading) {
		return <div>loading...</div>;
	}

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

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
				<h2>Login</h2>
				<LoginForm setToken={setToken} setError={notify} />
			</>
		);
	}

	return (
		<div>
			<Notify errorMessage={errorMessage} />
			<button onClick={logout}>logout</button>
			<Persons persons={result.data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm setError={notify} />
		</div>
	);
};

export default App;

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}
	return <div style={{ color: "red" }}>{errorMessage}</div>;
};
