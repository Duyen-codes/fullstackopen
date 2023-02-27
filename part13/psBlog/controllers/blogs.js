const router = require("express").Router();
const { Blog, User } = require("../models");
const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");
const { SECRET } = require("../util/config");
const { tokenExtractor } = require("../util/middleware");

const { Op } = require("sequelize");

const blogFinder = async (req, res, next) => {
	try {
		req.blog = await Blog.findByPk(req.params.id);
		next();
	} catch (error) {
		next(error);
	}
};

router.post("/", tokenExtractor, async (req, res, next) => {
	console.log("posting new blog");
	try {
		const user = await User.findByPk(req.decodedToken.id);
		console.log("user", user);
		if (!user) {
			return res.status(401).json({ error: "user not found" });
		}

		if (req.body.year < 1991 || req.body.year > new Date().getFullYear()) {
			return res.status(400).json({ error: "year written is invalid" });
		}

		// const blog = await Blog.create({ ...req.body });

		const blog = Blog.build({ ...req.body });
		console.log("user.id", user.id);
		blog.userId = user.id;
		await blog.save();
		console.log("req.body", req.body);
		console.log("blog", blog);
		res.status(201).json(blog);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get("/", async (req, res) => {
	const where = {};

	if (req.query.search) {
		where[Op.or] = [
			{ title: { [Op.substring]: req.query.search } },
			{ author: { [Op.substring]: req.query.search } },
		];
	}

	const blogs = await Blog.findAll({
		attributes: { exclude: ["userId"] },
		include: {
			model: User,
		},
		where,
		order: [["likes", "DESC"]],
	});
	res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
	if (req.blog) {
		res.json(req.blog);
	} else {
		res.status(404).end();
	}
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.decodedToken.id);
		console.log("user", user);

		console.log("req.blog", req.blog);

		if (!user || !req.blog || req.blog.userId !== user.id) {
			return res.status(401).json({ error: "operation not permitted" });
		}

		await req.blog.destroy();

		res.status(204).end();
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.put("/:id", blogFinder, async (req, res) => {
	if (req.blog) {
		console.log(req.blog);
		req.blog.likes = req.body.likes;
		await req.blog.save();
		res.json(req.blog);
	} else {
		res.status(404).end();
	}
});

module.exports = router;
