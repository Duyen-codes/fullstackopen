const router = require("express").Router();
const { Note, User } = require("../models");
const { SECRET } = require("../util/config");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { tokenExtractor } = require("../util/middleware");

router.get("/", async (req, res) => {
	const where = {};

	if (req.query.important) {
		where.important = req.query.important === "true";
	}

	if (req.query.search) {
		where.content = {
			[Op.substring]: req.query.search,
		};
	}
	const notes = await Note.findAll({
		attributes: { exclude: ["userId"] },
		include: {
			model: User,
			attributes: ["name", "username"],
		},
		where,
	});
	res.json(notes);
});

const noteFinder = async (req, res, next) => {
	req.note = await Note.findByPk(req.params.id);
	next();
};

router.post("/", tokenExtractor, async (req, res) => {
	try {
		const user = await User.findByPk(req.decodedToken.id);
		const note = await Note.create({
			...req.body,
			userId: user.id,
			date: new Date(),
		});
		res.json(note);
	} catch (error) {
		return res.status(400).json({ error });
	}
});

router.get("/:id", noteFinder, async (req, res) => {
	if (req.note) {
		res.json(req.note);
	} else {
		res.status(404).end();
	}
});

router.delete("/:id", noteFinder, async (req, res) => {
	if (req.note) {
		await req.note.destroy();
		res.status(204).end();
	} else {
		res.status(404).end();
	}
});

router.put("/:id", noteFinder, async (req, res) => {
	if (req.note) {
		req.note.important = req.body.important;
		await req.note.save();
		res.json(req.note);
	} else {
		res.status(404).end();
	}
});

module.exports = router;
