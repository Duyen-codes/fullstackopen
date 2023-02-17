const errorHandler = (error, req, res, next) => {
	console.log("error.message: ", error.message)

	if (error.name === "SequelizeDatabaseError") {
		return res.status(400).send({ error: "malformatted id" })
	}

	if (error.name === "SequelizeValidationError") {
		return res.status(400).send({ error: error.message })
	}
	next(error)
}

module.exports = {
	errorHandler,
}
