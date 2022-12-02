import { useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../queries";
import { useMutation } from "@apollo/client";

import Select from "react-select";

const Authors = ({ show, authors }) => {
	console.log("show in Authors", show);
	const [selectedOption, setSelectedOption] = useState(null);
	const [born, setBorn] = useState("");

	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
	});

	const options = authors?.map((author) => ({
		value: `${author.name}`,
		label: `${author?.name}`,
	}));

	const submit = (event) => {
		console.log("edit author submitted");
		event.preventDefault();
		editAuthor({
			variables: { name: selectedOption.value, setBornTo: parseInt(born) },
		});
		setSelectedOption(null);
		setBorn("");
	};
	if (!show) {
		return null;
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors?.map((a, i) => (
						<tr key={i}>
							<td>{a?.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h3>Set birthyear</h3>
			<form onSubmit={submit}>
				<div>
					name{" "}
					<Select
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						options={options}
					/>
				</div>
				<div>
					born{" "}
					<input
						type='number'
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type='submit'>update author</button>
			</form>
		</div>
	);
};

export default Authors;
