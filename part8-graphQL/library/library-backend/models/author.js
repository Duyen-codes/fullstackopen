const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minLength: 4,
	},
	born: {
		type: Number,
	},
	books: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
		},
	],
});

module.exports = mongoose.model("Author", authorSchema);
