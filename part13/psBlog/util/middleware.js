const jwt = require("jsonwebtoken");
const { SECRET } = require("./config.js");

const errorHandler = (error, req, res, next) => {
	console.log("error.message: ", error.message);

	if (error.name === "SequelizeDatabaseError") {
		return res.status(400).send({ error: "malformatted id" });
	}

	if (error.name === "SequelizeValidationError") {
		return res.status(400).send({ error: error.message });
	} else if (error.name === "JsonWebTokenError") {
		return res.status(400).json({ error: error.message });
	}
	next(error);
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

module.exports = {
	errorHandler,
	tokenExtractor,
};
