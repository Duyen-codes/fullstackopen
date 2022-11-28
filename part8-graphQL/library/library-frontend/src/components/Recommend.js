import React from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../queries";

const Recommend = ({ books, show }) => {
	console.log("recommended rendered");
	const { loading, data } = useQuery(ME);
	console.log("user in Recommend", data);

	if (!books) {
		return null;
	}
	if (loading) {
		return <div>loading user...</div>;
	}

	let recommendedBooks = books.filter((book) =>
		book.genres.includes(data?.me?.favoriteGenre),
	);

	console.log("recommendedBooks", recommendedBooks);

	if (!show) {
		return null;
	}
	return (
		<div>
			<h2>Recommendations</h2>
			<p>
				Books in your favorite genre <b>{data?.me?.favoriteGenre}</b>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{recommendedBooks?.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommend;
