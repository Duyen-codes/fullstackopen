const router = require("express").Router();
const { Blog } = require("../models");
const sequelize = require("sequelize");

router.get("/", async (req, res) => {
	const authorStats = await Blog.findAll({
		attributes: [
			"author",
			[
				sequelize.fn("COUNT", sequelize.fn("DISTINCT", sequelize.col("title"))),
				"articles",
			],
			[sequelize.fn("SUM", sequelize.col("likes")), "likes"],
		],
		group: ["author"],
		order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]],
	});

	res.json(authorStats);
});

module.exports = router;
