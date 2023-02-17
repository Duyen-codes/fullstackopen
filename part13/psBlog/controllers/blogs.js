const router = require("express").Router()
const { Blog } = require("../models")

const blogFinder = async (req, res, next) => {
	try {
		req.blog = await Blog.findByPk(req.params.id)
		next()
	} catch (error) {
		next(error)
	}
}

router.post("/", async (req, res, next) => {
	try {
		const blog = await Blog.create(req.body)
		res.status(201).json(blog)
	} catch (error) {
		next(error)
	}
})

router.get("/", async (req, res) => {
	const blogs = await Blog.findAll()
	res.json(blogs)
})

router.get("/:id", blogFinder, async (req, res) => {
	if (req.blog) {
		res.json(req.blog)
	} else {
		res.status(404).end()
	}
})

router.delete("/:id", blogFinder, async (req, res, next) => {
	try {
		if (req.blog) {
			await req.blog.destroy()
			res.status(204).end()
		} else {
			res.status(404).end()
		}
	} catch (error) {
		next(error)
	}
})

router.put("/:id", blogFinder, async (req, res) => {
	if (req.blog) {
		console.log(req.blog)
		req.blog.likes = req.body.likes
		await req.blog.save()
		res.json(req.blog)
	} else {
		res.status(404).end()
	}
})

module.exports = router
