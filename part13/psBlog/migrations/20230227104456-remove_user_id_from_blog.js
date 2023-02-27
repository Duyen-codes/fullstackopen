const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn("blogs", "user_id");
	},

	down: async ({ context: queryInterface }) => {
		await queryInterface.addColumn("blogs", "user_id", {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "users",
				key: "id",
			},
		});
	},
};
