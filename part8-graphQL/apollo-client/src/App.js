import { useState } from "react";
import { useQuery } from "@apollo/client";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PhoneForm from "./components/PhoneForm";

import { ALL_PERSONS } from "./queries";

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const result = useQuery(ALL_PERSONS);
	console.log("result", result);

	if (result.loading) {
		return <div>loading...</div>;
	}

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	return (
		<div>
			<Notify errorMessage={errorMessage} />
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
