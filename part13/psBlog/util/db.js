const Sequelize = require("sequelize")
const { DATABASE_URL } = require("../util/config")

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
	try {
		await sequelize.authenticate()
		console.log("connected to the database")
	} catch (err) {
		console.error("failed to connect to db: ", err)
		process.exit()
	}
	return null
}

module.exports = { connectToDatabase, sequelize }
