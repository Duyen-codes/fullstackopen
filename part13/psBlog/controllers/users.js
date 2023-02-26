const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Blog } = require("../models");

router.post("/", async (req, res) => {
	const { username, name, password } = req.body;
	try {
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const user = await User.create({
			username,
			name,
			passwordHash,
		});

		res.status(201).json(user);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

router.get("/", async (req, res) => {
	const users = await User.findAll({
		include: {
			model: Blog,
			attributes: { exclude: ["userId"] },
		},
	});
	res.json(users);
});

router.put("/:username", async (req, res) => {
	const { username } = req.params;
	const { newUsername } = req.body;

	try {
		const user = await User.findOne({ where: { username } });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// update the user's username

		user.username = newUsername;

		await user.save();

		res.json(user); // return the update user object
	} catch (error) {
		console.error(error);
		res.status(400).json({ error });
	}
});

module.exports = router;
