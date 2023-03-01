const router = require("express").Router();
const { User, Session } = require("../models");
const { tokenExtractor } = require("../util/middleware");

router.delete("/", tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id);

	const session = await Session.findOne({ where: { userId: user.id } });

	if (!user) {
		return res.status(401).json({
			error: "operation not permitted",
		});
	}
	if (!session) {
		return res.status(401).json({
			error: "no session found",
		});
	}

	await session.destroy();

	res.status(204).end();
});
module.exports = router;
