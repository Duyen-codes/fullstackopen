import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
	const [page, setPage] = useState("authors");
	const [errorMessage, setErrorMessage] = useState(null);
	const result = useQuery(ALL_AUTHORS);
	const bookResult = useQuery(ALL_BOOKS);

	if (result.loading || bookResult.loading) {
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
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				<button onClick={() => setPage("add")}>add book</button>
			</div>
			<Notify errorMessage={errorMessage} />
			<Authors
				show={page === "authors"}
				authors={result.data.allAuthors}
				setError={notify}
			/>

			<Books show={page === "books"} books={bookResult.data.allBooks} />

			<NewBook show={page === "add"} setError={notify} />
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
