const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		minLength: 3,
	},
	friends: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Person",
		},
	],
});

module.exports = mongoose.model("User", userSchema);
