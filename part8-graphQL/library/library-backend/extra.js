// let counter = [];
// const bookLength = await Book.collection.countDocuments();
// const books = await Book.find({}).populate("author", { name: 1 });

// const authors = await Author.find({});

// for (let i = 0; i < bookLength; i++) {
// 	if (counter[books[i].author.name]) {
// 		counter[books[i].author.name] += 1;
// 	} else {
// 		counter[books[i].author.name] = 1;
// 	}
// }

// const reformattedArray = authors.map((author) => ({
// 	id: author._id.toString(),
// 	name: author.name,
// 	born: author.born || null,
// 	bookCount: counter[author.name] || 0,
// }));

// return reformattedArray;
