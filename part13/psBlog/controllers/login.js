const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Session } = require("../models");
const { SECRET } = require("../util/config");

router.post("/", async (req, res) => {
	const { username, password } = req.body;

	// search for user from the db by the username attached to the request body.
	const user = await User.findOne({ where: { username } });

	console.log("user", user);

	// check password, also attached to the request. bcrypt.compare method is used to check if the password is correct
	const passwordCorrect =
		user === null ? false : await bcrypt.compare(password, user.passwordHash);

	// if user is not found or the password is incorrect, the request is responded to with the status code 401 unauthorized
	if (!(user && passwordCorrect)) {
		return res.status(401).json({
			error: "invalid  username or password",
		});
	}

	// if user is disabled, res with error msg

	if (user.disabled) {
		return res.status(401).json({ error: "user account is disabled" });
	}
	// if password is correct, a token is created with the method jwt.sign
	const userForToken = {
		username: user.username,
		id: user.id,
	};

	const token = jwt.sign(userForToken, SECRET);

	const session = await Session.create({ userId: user.id, token });

	console.log("session", session);

	res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
