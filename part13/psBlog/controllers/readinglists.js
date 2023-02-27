const readingListRouter = require("express").Router();
const { ReadingList } = require("../models");

readingListRouter.post("/", async (req, res) => {
	const newList = await ReadingList.create(req.body);
	console.log("req.body", req.body);
	console.log("newList", newList);
	res.json(newList);
});

readingListRouter.put("/:id", async (req, res) => {
	const readingItem = await ReadingList.findByPk(req.params.id);
	console.log("readingItem", readingItem);
});

module.exports = readingListRouter;
