const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginRouter = require("express").Router();

const { SECRET } = require("../util/config");

const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
	const body = req.body;

	const user = await User.findOne({
		where: {
			username: body.username,
		},
	});

	const passwordCorrect = body.password === "secret";

	if (!(user && passwordCorrect)) {
		return res.status(401).json({
			error: "invalid username or password",
		});
	}

	if (user.disabled) {
		return res.status(401).json({
			error: "account disabled, please contact admin",
		});
	}
	const userForToken = {
		username: user.username,
		id: user.id,
	};

	const token = jwt.sign(userForToken, SECRET);

	res.status(200).send({
		token,
		username: user.username,
		name: user.name,
	});
});

module.exports = loginRouter;
