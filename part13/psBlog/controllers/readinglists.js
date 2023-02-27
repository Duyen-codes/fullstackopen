const readingListRouter = require("express").Router();
const { ReadingList, User } = require("../models");
const { tokenExtractor } = require("../util/middleware");

readingListRouter.post("/", async (req, res) => {
	const newList = await ReadingList.create(req.body);
	console.log("req.body", req.body);
	console.log("newList", newList);
	res.json(newList);
});

readingListRouter.put("/:id", tokenExtractor, async (req, res) => {
	const readingItem = await ReadingList.findByPk(req.params.id);
	console.log("readingItem", readingItem);

	const user = await User.findByPk(req.decodedToken.id);

	console.log("user", user);
	if (user.id === readingItem.userId) {
		readingItem.read = req.body.read;
		await readingItem.save();
		res.json(readingItem);
	} else {
		res.status(404).end();
	}
});

module.exports = readingListRouter;
