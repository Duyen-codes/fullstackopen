const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

router.post("/", async (req, res) => {
	const { username, password } = req.body;

	// search for user from the db by the username attached to the request body.
	const user = await User.findOne({ where: { username } });

	console.log("user", user);

	// check password, also attached to the request. bcrypt.compare method is used to check if the password is correct
	const passwordCorrect =
		user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return res.status(401).json({
			error: "invalid  username or password",
		});
	}

	const userForToken = {
		username: user.username,
		id: user.id,
	};

	const token = jwt.sign(userForToken, process.env.SECRET);

	res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
