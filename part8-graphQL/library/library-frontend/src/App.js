import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
	const uniqByTitle = (array) => {
		let seen = new Set();
		return array.filter((item) => {
			let k = item.title;
			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, ({ allBooks }) => {
		return { allBooks: uniqByTitle(allBooks.concat(addedBook)) };
	});
};

const App = () => {
	const [page, setPage] = useState("authors");
	const [errorMessage, setErrorMessage] = useState(null);

	const authorResult = useQuery(ALL_AUTHORS);
	const bookResult = useQuery(ALL_BOOKS);

	console.log("bookResult", bookResult);
	console.log("authorResult", authorResult);

	const [token, setToken] = useState(
		localStorage.getItem("library-user-token") || null,
	);
	const client = useApolloClient();

	const [user, setUser] = useState(null);

	console.log("token App.js", token);

	useSubscription(BOOK_ADDED, {
		onData: ({ data }) => {
			console.log("from useSubscription in App.js");
			console.log("data", data);
			const addedBook = data.data.bookAdded;
			window.alert(`${addedBook.title} added`);

			client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
				return {
					allBooks: allBooks.concat(addedBook),
				};
			});
		},
	});

	if (authorResult.loading || bookResult.loading) {
		return <div>loading...</div>;
	}

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
		setUser(null);
	};

	if (!token) {
		return (
			<div>
				<Notify errorMessage={errorMessage} />
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				<button onClick={() => setPage("login")}>login</button>

				<LoginForm
					show={page === "login"}
					setToken={setToken}
					setError={notify}
					setUser={setUser}
				/>
				<Authors
					show={page === "authors"}
					authors={authorResult?.data?.allAuthors}
				/>
				<Books show={page === "books"} books={bookResult?.data?.allBooks} />
			</div>
		);
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				<button onClick={() => setPage("add")}>add book</button>
				<button onClick={() => setPage("recommend")}>recommend</button>
				<button onClick={logout}>logout</button>
			</div>
			<Notify errorMessage={errorMessage} />

			<Authors
				show={page === "authors"}
				authors={authorResult?.data?.allAuthors}
			/>

			<Books show={page === "books"} books={bookResult?.data?.allBooks} />

			<NewBook show={page === "add"} setError={notify} />
			<Recommend
				show={page === "recommend"}
				books={bookResult?.data?.allBooks}
			/>
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
