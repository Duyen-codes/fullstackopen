require("dotenv").config()
const { Sequelize, QueryTypes } = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE_URL)
const express = require("express")
const app = express()

const main = async () => {
	try {
		await sequelize.authenticate()
		const blogs = await sequelize.query("Select * from blogs", {
			type: QueryTypes.SELECT,
		})

		blogs.forEach((blog) => {
			console.log(
				`${blog.author}: `,
				`'${blog.title}', `,
				`${blog.likes} likes`,
			)
		})
		sequelize.close()
	} catch (error) {
		console.error("Unable to connect to the db:", error)
	}
}
main()
