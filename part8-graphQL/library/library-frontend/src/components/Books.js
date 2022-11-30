import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
	const [selectedGenre, setSelectedGenre] = useState(null);
	const result = useQuery(ALL_BOOKS, {
		variables: { selectedGenre },
		skip: !selectedGenre,
	});

	if (!props.show) {
		return null;
	}

	let booksToShow = [];

	if (selectedGenre && result.data) {
		console.log("selectedGenre", selectedGenre);
		console.log("result.data", result.data.allBooks);
		booksToShow = result.data.allBooks;
	}

	console.log("books", props.books);

	if (selectedGenre === null) {
		booksToShow = props.books;
	}

	console.log("booksToShow", booksToShow);

	if (!props.books) {
		return null;
	}

	const genreArray = props.books?.map((book) => book.genres);

	let uniqueGenres = [];
	genreArray.forEach((element) => {
		element.forEach((ele) => {
			if (!uniqueGenres.includes(ele)) {
				uniqueGenres.push(ele);
			}
		});
	});

	return (
		<div>
			<h2>books</h2>
			<p> {selectedGenre ? `in genre ${selectedGenre}` : null}</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{booksToShow.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				{uniqueGenres.map((g) => {
					return (
						<button key={g} onClick={() => setSelectedGenre(g)}>
							{g}
						</button>
					);
				})}
				<button onClick={() => setSelectedGenre(null)}>all genres</button>
			</div>
		</div>
	);
};

export default Books;
