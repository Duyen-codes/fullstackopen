const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");
class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true, // use built-in isEmail validation
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password_hash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize, underscored: true, modelName: "user" },
);

module.exports = User;
