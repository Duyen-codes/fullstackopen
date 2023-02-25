const router = require("express").Router();
const { Blog, User } = require("../models");
const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");
const { SECRET } = require("../util/config");

const blogFinder = async (req, res, next) => {
	try {
		req.blog = await Blog.findByPk(req.params.id);
		next();
	} catch (error) {
		next(error);
	}
};

const tokenExtractor = (req, res, next) => {
	const authorization = req.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		try {
			const token = authorization.substring(7);
			req.decodedToken = jwt.verify(token, SECRET);

			next();
		} catch {
			return res.status(401).json({ error: "token invalid" });
		}
	} else {
		return res.status(401).json({ error: "token missing" });
	}
};

router.post("/", tokenExtractor, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.decodedToken.id);
		console.log("user", user);
		if (!user) {
			return res.status(401).json({ error: "user not found" });
		}
		const blog = await Blog.create({ ...req.body, userId: user.id });

		res.status(201).json(blog);
	} catch (error) {
		next(error);
	}
});

router.get("/", async (req, res) => {
	const blogs = await Blog.findAll({
		attributes: { exclude: ["userId"] },
		include: {
			model: User,
		},
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
